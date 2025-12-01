import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - webhook', () => {
  test('should list webhooks', async () => {
    const node = new Woovi();
    const responseData = {
      pageInfo: {
        skip: 0,
        limit: 100,
        totalCount: 2,
        hasPreviousPage: false,
        hasNextPage: true,
      },
      webhooks: [{ id: 'w1' }, { id: 'w2' }],
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'webhook',
        operation: 'list',
        url: 'https://mycompany.com.br/webhook',
        limit: 10,
        skip: 5,
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'GET',
    });

    const calledUrl = new URL(context.lastRequestOptions!.url as string);
    expect(calledUrl.origin + calledUrl.pathname).toBe(
      'https://api.woovi.com/api/v1/webhook',
    );
    const qs = calledUrl.searchParams;
    expect(qs.get('url')).toBe('https://mycompany.com.br/webhook');
    expect(qs.get('limit')).toBe('10');
    expect(qs.get('skip')).toBe('5');
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should delete a webhook', async () => {
    const node = new Woovi();
    const responseData = { status: 'deleted' };
    const context = createExecuteContext({
      parameters: {
        resource: 'webhook',
        operation: 'delete',
        webhookId: 'Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA==',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'DELETE',
      url: 'https://api.woovi.com/api/v1/webhook/Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA==',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create a webhook', async () => {
    const node = new Woovi();
    const responseData = {
      webhook: {
        id: 'new-webhook-id',
        name: 'webhookName',
        url: 'https://mycompany.com.br/webhook',
        authorization: 'openpix',
        isActive: true,
        event: 'OPENPIX:TRANSACTION_RECEIVED',
        createdAt: '2021-03-02T22:29:10.720Z',
        updatedAt: '2021-03-02T22:29:10.720Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'webhook',
        operation: 'create',
        name: 'webhookName',
        event: 'OPENPIX:TRANSACTION_RECEIVED',
        url: 'https://mycompany.com.br/webhook',
        authorization: 'openpix',
        isActive: true,
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/webhook',
      body: {
        webhook: {
          name: 'webhookName',
          event: 'OPENPIX:TRANSACTION_RECEIVED',
          url: 'https://mycompany.com.br/webhook',
          authorization: 'openpix',
          isActive: true,
        },
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get webhook IPs', async () => {
    const node = new Woovi();
    const responseData = { ips: ['189.51.60.9', '138.97.124.129'] };
    const context = createExecuteContext({
      parameters: {
        resource: 'webhook',
        operation: 'getIps',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'GET',
      url: 'https://api.woovi.com/api/v1/webhook/ips',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
