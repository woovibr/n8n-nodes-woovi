import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - pixKey', () => {
  test('should check a pix key', async () => {
    const node = new Woovi();
    const responseData = {
      pixKey: {
        key: 'test-key',
        type: 'EMAIL',
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'check',
        pixKey: 'test-key',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MQ',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'GET',
      url: 'https://api.woovi.com/api/v1/pix-keys/test-key/check',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error if pixKey is missing', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'check',
        pixKey: '',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MQ',
      },
      response: {},
    });

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(NodeApiError);

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(/The pixKey field is required/);
  });
});
