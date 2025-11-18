import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - subscription', () => {
  test('should get a subscription by id', async () => {
    const node = new Woovi();
    const responseData = {
      subscription: {
        id: 'sub_123456789',
        status: 'ACTIVE',
        value: 10000,
        dayGenerateCharge: 15,
        customer: {
          name: 'John Doe',
          taxID: '12345678900',
          email: 'john@example.com',
        },
        createdAt: '2025-11-01T10:00:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'getSubscription',
        id: 'sub_123456789',
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
      url: 'https://api.woovi.com/api/v1/subscriptions/sub_123456789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when getting subscription without id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'getSubscription',
        id: '',
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
    ).rejects.toThrow(/id é obrigatório/);
  });

  test('should handle URL encoding for special characters in id', async () => {
    const node = new Woovi();
    const specialId = 'sub_123/456';
    const responseData = {
      subscription: {
        id: specialId,
        status: 'ACTIVE',
        value: 5000,
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'getSubscription',
        id: specialId,
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
      url: 'https://api.woovi.com/api/v1/subscriptions/sub_123%2F456',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a subscription with complete data', async () => {
    const node = new Woovi();
    const responseData = {
      subscription: {
        id: 'sub_987654321',
        status: 'ACTIVE',
        value: 25000,
        dayGenerateCharge: 1,
        customer: {
          name: 'Jane Smith',
          taxID: '98765432100',
          email: 'jane@example.com',
          phone: '+5511999999999',
        },
        charge: {
          id: 'charge_123',
          correlationID: 'charge-monthly-001',
        },
        createdAt: '2025-10-15T08:30:00Z',
        updatedAt: '2025-11-18T12:45:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'getSubscription',
        id: 'sub_987654321',
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
      url: 'https://api.woovi.com/api/v1/subscriptions/sub_987654321',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
