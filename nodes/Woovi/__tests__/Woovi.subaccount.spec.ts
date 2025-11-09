import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - subaccount', () => {
  test('should list subaccounts', async () => {
    const node = new Woovi();
    const responseData = [{ id: 'sub1', pixKey: 'key1' }];
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'listSubaccounts',
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
      url: 'https://api.woovi.com/api/v1/subaccount',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should create a subaccount', async () => {
    const node = new Woovi();
    const responseData = { id: 'subcreated', pixKey: 'newkey' };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'createSubaccount',
        subaccountPixKey: 'newkey',
        subaccountName: 'Test',
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
      url: 'https://api.woovi.com/api/v1/subaccount',
      body: { pixKey: 'newkey', name: 'Test' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should withdraw from subaccount', async () => {
    const node = new Woovi();
    const responseData = { success: true };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'withdrawSubaccount',
        subaccountId: 'sub1',
        amount: 500,
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
      url: 'https://api.woovi.com/api/v1/subaccount/sub1/withdraw',
      body: { value: 500 },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a subaccount by id', async () => {
    const node = new Woovi();
    const responseData = { id: 'sub1', pixKey: 'key1' };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'getSubaccount',
        subaccountId: 'sub1',
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

    expect(context.lastRequestOptions?.url).toBe(
      'https://api.woovi.com/api/v1/subaccount/sub1',
    );
    expect(context.lastRequestOptions?.method).toBe('GET');
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should delete a subaccount', async () => {
    const node = new Woovi();
    const responseData = { success: true };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'deleteSubaccount',
        subaccountId: 'sub1',
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

    expect(context.lastRequestOptions?.url).toBe(
      'https://api.woovi.com/api/v1/subaccount/sub1',
    );
    expect(context.lastRequestOptions?.method).toBe('DELETE');
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should debit from subaccount', async () => {
    const node = new Woovi();
    const responseData = { success: true };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'debitSubaccount',
        subaccountId: 'sub1',
        amount: 250,
        operationDescription: 'Move funds',
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

    expect(context.lastRequestOptions).toMatchObject({
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/subaccount/sub1/debit',
      body: { value: 250, description: 'Move funds' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should transfer between subaccounts', async () => {
    const node = new Woovi();
    const responseData = { success: true };
    const context = createExecuteContext({
      parameters: {
        resource: 'subaccount',
        operation: 'transferSubaccounts',
        amount: 500,
        fromPixKey: 'from-key',
        toPixKey: 'to-key',
        correlationID: 'corr-1',
        operationDescription: 'Internal transfer',
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

    expect(context.lastRequestOptions).toMatchObject({
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/subaccount/transfer',
      body: {
        value: 500,
        fromPixKey: 'from-key',
        toPixKey: 'to-key',
        correlationID: 'corr-1',
        description: 'Internal transfer',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
