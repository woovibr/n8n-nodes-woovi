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
        operation: 'listWebhooks',
        url: 'https://mycompany.com.br/webhook',
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
      url: 'https://api.woovi.com/api/v1/webhook?url=https%3A%2F%2Fmycompany.com.br%2Fwebhook',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should delete a webhook', async () => {
    const node = new Woovi();
    const responseData = { status: 'deleted' };
    const context = createExecuteContext({
      parameters: {
        resource: 'webhook',
        operation: 'deleteWebhook',
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
});
