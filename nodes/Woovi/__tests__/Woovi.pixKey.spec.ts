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
    ).rejects.toThrow(/O campo pixKey é obrigatório/);
  });

  test('should set a pix key as default', async () => {
    const node = new Woovi();
    const responseData = {
      pixKey: {
        key: 'test-key',
        type: 'EMAIL',
        status: 'ACTIVE',
        default: true,
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'setDefault',
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
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/pix-keys/test-key/default',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should delete a pix key', async () => {
    const node = new Woovi();
    const responseData = {
      pixKey: {
        key: 'test-key',
        type: 'EMAIL',
        status: 'DELETED',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'delete',
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
      method: 'DELETE',
      url: 'https://api.woovi.com/api/v1/pix-keys/test-key',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create a pix key', async () => {
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
        operation: 'create',
        pixKey: 'test-key',
        pixKeyType: 'EMAIL',
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
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/pix-keys',
      body: {
        key: 'test-key',
        type: 'EMAIL',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get pix key tokens', async () => {
    const node = new Woovi();
    const responseData = {
      tokens: {
        limit: 10,
        refresh: 1000,
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'getTokens',
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
      url: 'https://api.woovi.com/api/v1/pix-keys/tokens',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list pix keys', async () => {
    const node = new Woovi();
    const responseData = {
      pixKeys: [
        {
          key: 'key1',
          type: 'CNPJ',
          isDefault: true,
        },
        {
          key: 'key2',
          type: 'EVP',
          isDefault: false,
        },
      ],
      account: {
        accountId: 'acc-123',
        isDefault: true,
        balance: 1000,
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'pixKey',
        operation: 'list',
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
      url: 'https://api.woovi.com/api/v1/pix-keys',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
