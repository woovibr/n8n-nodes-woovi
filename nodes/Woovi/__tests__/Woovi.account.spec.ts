import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - account', () => {
  test('should create account', async () => {
    const node = new Woovi();
    const responseData = { id: 'acc123', status: 'ACTIVE' };
    const context = createExecuteContext({
      parameters: {
        resource: 'account',
        operation: 'create',
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
      url: 'https://api.woovi.com/api/v1/account',
      body: {},
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should withdraw from account', async () => {
    const node = new Woovi();
    const responseData = {
      withdraw: {
        account: { id: 'acc123' },
        transaction: { id: 'txn456' },
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'account',
        operation: 'withdraw',
        accountId: 'acc123',
        value: 5000,
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
      url: 'https://api.woovi.com/api/v1/account/acc123/withdraw',
      body: { value: 5000 },
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});

describe('Woovi node - delete account register', () => {
  test('should delete account register', async () => {
    const node = new Woovi();
    const responseData = {
      message: 'Account register successfully deleted',
      accountRegisterId: '123456789',
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'accountRegister',
        operation: 'delete',
        taxID: '123456789',
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
      url: 'https://api.woovi.com/api/v1/account-register/123456789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
