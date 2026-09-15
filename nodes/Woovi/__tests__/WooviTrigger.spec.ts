import { createHmac } from 'crypto';
import type {
  IDataObject,
  IHookFunctions,
  IHttpRequestOptions,
  IWebhookFunctions,
} from 'n8n-workflow';

import { WooviTrigger } from '../WooviTrigger.node';

const hmacSecretKey = 'openpix_g98Nj/oCocUi4mBu/AP5avmbLEmk=';

const webhookUrl = 'https://localhost:5678/webhook/f1eea6b0/webhook';

const payload = JSON.stringify({
  event: 'OPENPIX:CHARGE_COMPLETED',
  charge: {
    status: 'COMPLETED',
    value: 10000,
    correlationID: 'abc-123',
  },
});

const sign = (body: string, key = hmacSecretKey) =>
  createHmac('sha1', key).update(Buffer.from(body)).digest('base64');

type HookContextOptions = {
  parameters?: IDataObject;
  staticData?: IDataObject;
  response?: unknown;
  error?: unknown;
};

const createHookContext = ({
  parameters = {},
  staticData = {},
  response,
  error,
}: HookContextOptions) => {
  const requestWithAuthentication = jest.fn(
    async (_name: string, options: IHttpRequestOptions) => {
      context.lastRequestOptions = options;

      if (error) {
        throw error;
      }

      return response;
    },
  );

  const context = {
    getNodeWebhookUrl: () => webhookUrl,
    getWorkflowStaticData: () => staticData,
    getNodeParameter: (name: string, fallback?: unknown) =>
      parameters[name] === undefined ? fallback : parameters[name],
    getCredentials: async () => ({
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'token',
    }),
    getNode: () => ({ name: 'Woovi Trigger' }),
    helpers: { requestWithAuthentication },
    lastRequestOptions: undefined as IHttpRequestOptions | undefined,
  };

  return { context, staticData, requestWithAuthentication };
};

const runHook = (
  method: 'checkExists' | 'create' | 'delete',
  options: HookContextOptions,
) => {
  const { context, staticData, requestWithAuthentication } =
    createHookContext(options);

  const node = new WooviTrigger();

  return {
    result: node.webhookMethods.default[method].call(
      context as unknown as IHookFunctions,
    ),
    staticData,
    context,
    requestWithAuthentication,
  };
};

type WebhookContextOptions = {
  parameters?: IDataObject;
  staticData?: IDataObject;
  headers?: Record<string, string>;
  rawBody?: Buffer | string;
  body?: unknown;
};

const runWebhook = ({
  parameters = {},
  staticData = {},
  headers = {},
  rawBody,
  body,
}: WebhookContextOptions) => {
  const context = {
    getRequestObject: () => ({ headers, rawBody, body }),
    getWorkflowStaticData: () => staticData,
    getNodeParameter: (name: string, fallback?: unknown) =>
      parameters[name] === undefined ? fallback : parameters[name],
  };

  return new WooviTrigger().webhook.call(
    context as unknown as IWebhookFunctions,
  );
};

it('should store the hmac secret of a webhook registered outside the node', async () => {
  const { result, staticData, context } = runHook('checkExists', {
    response: { webhooks: [{ id: 'w1', url: webhookUrl, hmacSecretKey }] },
  });

  await expect(result).resolves.toBe(true);

  expect(staticData).toEqual({ hmacSecretKey });
  expect(staticData.webhookId).toBeUndefined();
  expect(context.lastRequestOptions).toMatchObject({
    method: 'GET',
    qs: { url: webhookUrl },
  });
});

it('should ask n8n to create the webhook when none is registered', async () => {
  const { result, staticData } = runHook('checkExists', {
    response: { webhooks: [] },
  });

  await expect(result).resolves.toBe(false);

  expect(staticData).toEqual({});
});

it('should skip registration when there is no usable credential', async () => {
  const { result, staticData } = runHook('checkExists', {
    error: new Error('no credentials got returned'),
  });

  await expect(result).resolves.toBe(true);

  expect(staticData).toEqual({});
});

it('should register the webhook and store its id and hmac secret', async () => {
  const { result, staticData, context } = runHook('create', {
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    response: { webhook: { id: 'w1', hmacSecretKey } },
  });

  await expect(result).resolves.toBe(true);

  expect(staticData).toEqual({ webhookId: 'w1', hmacSecretKey });
  expect(context.lastRequestOptions).toMatchObject({
    method: 'POST',
    body: {
      webhook: {
        name: 'N8N Webhook',
        url: webhookUrl,
        event: 'OPENPIX:CHARGE_COMPLETED',
        isActive: true,
      },
    },
  });
});

it('should not register a webhook for the ALL event', async () => {
  const { result, staticData, requestWithAuthentication } = runHook('create', {
    parameters: { events: 'ALL' },
  });

  await expect(result).resolves.toBe(true);

  expect(requestWithAuthentication).not.toHaveBeenCalled();
  expect(staticData).toEqual({});
});

it('should not block activation when registration fails', async () => {
  const { result, staticData } = runHook('create', {
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    error: new Error('request failed'),
  });

  await expect(result).resolves.toBe(true);

  expect(staticData).toEqual({});
});

it('should delete only a webhook registered by the node', async () => {
  const { result, staticData, context } = runHook('delete', {
    staticData: { webhookId: 'w1', hmacSecretKey },
    response: { status: 'deleted' },
  });

  await expect(result).resolves.toBe(true);

  expect(staticData).toEqual({});
  expect(context.lastRequestOptions).toMatchObject({ method: 'DELETE' });
});

it('should drop the hmac secret without deleting a webhook it did not register', async () => {
  const { result, staticData, requestWithAuthentication } = runHook('delete', {
    staticData: { hmacSecretKey },
  });

  await expect(result).resolves.toBe(true);

  expect(requestWithAuthentication).not.toHaveBeenCalled();
  expect(staticData).toEqual({});
});

it('should accept a genuine webhook signed with the stored secret', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    staticData: { hmacSecretKey },
    headers: { 'x-openpix-signature': sign(payload) },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toEqual([[{ json: JSON.parse(payload) }]]);
});

it('should accept a genuine webhook signed with the configured secret', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED', hmacSecretKey },
    headers: { 'x-openpix-signature': sign(payload) },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toEqual([[{ json: JSON.parse(payload) }]]);
});

it('should reject a forged webhook with 401', async () => {
  const forged = JSON.stringify({
    event: 'OPENPIX:CHARGE_COMPLETED',
    charge: { status: 'COMPLETED', value: 10000000 },
  });

  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    staticData: { hmacSecretKey },
    rawBody: Buffer.from(forged),
    body: JSON.parse(forged),
  });

  expect(result.workflowData).toBeUndefined();
  expect(result.webhookResponse).toEqual({
    statusCode: 401,
    body: { success: false, message: 'invalid webhook signature' },
  });
});

it('should reject a webhook signed with another secret', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    staticData: { hmacSecretKey },
    headers: { 'x-openpix-signature': sign(payload, 'another_secret') },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toBeUndefined();
  expect(result.webhookResponse).toMatchObject({ statusCode: 401 });
});

it('should verify against the re-serialized body when rawBody is missing', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    staticData: { hmacSecretKey },
    headers: { 'x-openpix-signature': sign(payload) },
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toEqual([[{ json: JSON.parse(payload) }]]);
});

it('should reject when the configured public key is malformed', async () => {
  const result = await runWebhook({
    parameters: {
      events: 'OPENPIX:CHARGE_COMPLETED',
      webhookPublicKey: 'not-a-key',
    },
    headers: { 'x-webhook-signature': 'whatever' },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toBeUndefined();
  expect(result.webhookResponse).toMatchObject({ statusCode: 401 });
});

it('should keep accepting webhooks when no secret and no public key are set', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_COMPLETED' },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toEqual([[{ json: JSON.parse(payload) }]]);
});

it('should still reject an event the node is not listening to', async () => {
  const result = await runWebhook({
    parameters: { events: 'OPENPIX:CHARGE_CREATED' },
    staticData: { hmacSecretKey },
    headers: { 'x-openpix-signature': sign(payload) },
    rawBody: Buffer.from(payload),
    body: JSON.parse(payload),
  });

  expect(result.workflowData).toBeUndefined();
  expect(result.webhookResponse).toMatchObject({ statusCode: 422 });
});
