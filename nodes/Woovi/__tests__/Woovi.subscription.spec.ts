import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - subscription', () => {
  test('should list all subscriptions', async () => {
    const node = new Woovi();
    const responseData = {
      subscriptions: [
        {
          id: 'sub_123456789',
          status: 'ACTIVE',
          value: 10000,
          dayGenerateCharge: 15,
          customer: {
            name: 'John Doe',
            taxID: '12345678900',
          },
          createdAt: '2025-11-01T10:00:00Z',
        },
        {
          id: 'sub_987654321',
          status: 'ACTIVE',
          value: 25000,
          dayGenerateCharge: 1,
          customer: {
            name: 'Jane Smith',
            taxID: '98765432100',
          },
          createdAt: '2025-10-15T08:30:00Z',
        },
      ],
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'listSubscriptions',
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
      url: 'https://api.woovi.com/api/v1/subscriptions',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

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

  test('should list subscription installments', async () => {
    const node = new Woovi();
    const responseData = {
      installments: [
        {
          globalID: 'GI_123456789',
          endToEndId: 'E12345678912345678901234567890AB',
          value: 10000,
          status: 'ACTIVE',
          correlationID: 'installment-001',
          createdAt: '2025-11-01T10:00:00Z',
        },
        {
          globalID: 'GI_987654321',
          endToEndId: 'E98765432198765432109876543210BA',
          value: 10000,
          status: 'PAID',
          correlationID: 'installment-002',
          createdAt: '2025-12-01T10:00:00Z',
          paidAt: '2025-12-01T15:30:00Z',
        },
      ],
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'listSubscriptionInstallments',
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
      url: 'https://api.woovi.com/api/v1/subscriptions/sub_123456789/installments',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when listing installments without subscription id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'listSubscriptionInstallments',
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

  test('should handle URL encoding for subscription id when listing installments', async () => {
    const node = new Woovi();
    const specialId = 'sub_123/456';
    const responseData = {
      installments: [
        {
          globalID: 'GI_111',
          value: 5000,
          status: 'ACTIVE',
        },
      ],
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'subscription',
        operation: 'listSubscriptionInstallments',
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
      url: 'https://api.woovi.com/api/v1/subscriptions/sub_123%2F456/installments',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
