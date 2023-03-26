import nock from 'nock';

import wooviTriggerWorkflow from './wooviTriggerWorkflow.json';
import { executeWorkflow } from '../../../test/executeWorkflow';
import { CredentialsHelper } from '../../../test/CredentialsHelper';
import { runWebhookMethod } from '../../../test/runWebhookMethod';

it('should return false in checkExists webhook method since there is any webhook created', async () => {
  const scope = nock('https://api.woovi.com/api')
    .get('/v1/webhook')
    .query({
      url: 'https://localhost:80/f1eea6b0-4181-4131-b1d6-b57ac9c81b53/webhook',
    })
    .reply(200, {
      pageInfo: {
        skip: 0,
        limit: 100,
        totalCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      webhooks: [],
    });

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { workflow, additionalData } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviTriggerWorkflow,
  });

  const result = await runWebhookMethod(
    workflow,
    additionalData,
    'checkExists',
  );

  expect(result).toBe(false);

  expect(scope.isDone()).toBe(true);
});

it('should return true in checkExists webhook method since there is a webhook created with the same url', async () => {
  const webhook = {
    id: 'V2ViaG9vazo2NDFmOTYwNzNkMDlmYmI3NDdiODBlMGU=',
    name: 'N8N Webhook',
    url: 'https://localhost:80/f1eea6b0-4181-4131-b1d6-b57ac9c81b53/webhook',
    isActive: true,
    createdAt: '2023-03-26T00:47:03.555Z',
    updatedAt: '2023-03-26T00:47:03.555Z',
    actionPayload: {
      url: 'https://localhost:80/f1eea6b0-4181-4131-b1d6-b57ac9c81b53/webhook',
    },
    event: 'OPENPIX:CHARGE_CREATED',
    hmacSecretKey: 'openpix_g98Nj/oCocUi4mBu/AP5avmbLEmk=',
  };

  const scope = nock('https://api.woovi.com/api')
    .get('/v1/webhook')
    .query({
      url: 'https://localhost:80/f1eea6b0-4181-4131-b1d6-b57ac9c81b53/webhook',
    })
    .reply(200, {
      pageInfo: {
        skip: 0,
        limit: 100,
        totalCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      webhooks: [webhook],
    });

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { workflow, additionalData } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviTriggerWorkflow,
  });

  const result = await runWebhookMethod(
    workflow,
    additionalData,
    'checkExists',
  );

  expect(result).toBe(true);

  expect(scope.isDone()).toBe(true);

  const node = Object.values(workflow.nodes)[0];

  expect(workflow.getStaticData('node', node)).toEqual({
    webhookId: webhook.id,
  });
});

it('should create the webhook', async () => {
  const webhook = {
    id: 'V2ViaG9vazo2NDFmOTg4Njg0MmYzZTQ3Mzg2OTdiZWI=',
    name: 'N8N Webhook',
    event: 'OPENPIX:CHARGE_CREATED',
    url: 'https://localhost:80/f1eea6b0-4181-4131-b1d6-b57ac9c81b53/webhook',
    isActive: true,
    hmacSecretKey: 'openpix_Vfdm7CL/9BgLemtVXQmfk4G5I=',
    createdAt: '2023-03-26T00:57:42.157Z',
    updatedAt: '2023-03-26T00:57:42.157Z',
  };

  const scope = nock('https://api.woovi.com/api')
    .post('/v1/webhook')
    .query({ validate: false })
    .reply(200, {
      webhook,
    });

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { workflow, additionalData } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviTriggerWorkflow,
  });

  const result = await runWebhookMethod(workflow, additionalData, 'create');

  expect(result).toBe(true);

  expect(scope.isDone()).toBe(true);

  const node = Object.values(workflow.nodes)[0];

  expect(workflow.getStaticData('node', node)).toEqual({
    webhookId: webhook.id,
  });
});

it('should delete the webhook', async () => {
  const webhookId = 'V2ViaG9vazo2NDFmOTg4Njg0MmYzZTQ3Mzg2OTdiZWI=';

  const scope = nock('https://api.woovi.com/api')
    .delete(`/v1/webhook/${webhookId}`)
    .reply(200);

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { workflow, additionalData } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviTriggerWorkflow,
  });

  const node = Object.values(workflow.nodes)[0];

  const webhookData = workflow.getStaticData('node', node);
  webhookData.webhookId = webhookId;

  const result = await runWebhookMethod(workflow, additionalData, 'delete');

  expect(result).toBe(true);

  expect(scope.isDone()).toBe(true);

  expect(workflow.getStaticData('node', node)).toEqual({});
});
