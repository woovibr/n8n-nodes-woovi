import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - installment', () => {
  test('should get an installment by globalID', async () => {
    const node = new Woovi();
    const responseData = {
      installment: {
        globalID: 'GI_123456789',
        endToEndId: 'E12345678912345678901234567890AB',
        value: 10000,
        status: 'ACTIVE',
        correlationID: 'installment-123',
        customer: {
          name: 'John Doe',
          taxID: '12345678900',
        },
        createdAt: '2025-11-10T10:00:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'getInstallment',
        id: 'GI_123456789',
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123456789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get an installment by endToEndId', async () => {
    const node = new Woovi();
    const responseData = {
      installment: {
        globalID: 'GI_987654321',
        endToEndId: 'E98765432198765432109876543210BA',
        value: 25000,
        status: 'PAID',
        correlationID: 'installment-456',
        customer: {
          name: 'Jane Smith',
          taxID: '98765432100',
        },
        createdAt: '2025-11-09T15:30:00Z',
        paidAt: '2025-11-10T09:15:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'getInstallment',
        id: 'E98765432198765432109876543210BA',
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
      url: 'https://api.woovi.com/api/v1/installments/E98765432198765432109876543210BA',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when getting installment without id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'getInstallment',
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
    const specialId = 'GI_123/456';
    const responseData = {
      installment: {
        globalID: specialId,
        value: 5000,
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'getInstallment',
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123%2F456',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create CobR manually with value', async () => {
    const node = new Woovi();
    const responseData = {
      cobr: {
        globalID: 'Q29icjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
        value: 15000,
        brCode: 'PIX_BRCODE_HERE',
        pixKey: 'pix.key@example.com',
        status: 'ACTIVE',
        createdAt: '2025-11-18T10:00:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'createInstallmentCobr',
        id: 'GI_123456789',
        value: 15000,
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123456789/cobr',
      body: {
        value: 15000,
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create CobR manually without value (uses installment value)', async () => {
    const node = new Woovi();
    const responseData = {
      cobr: {
        globalID: 'Q29icjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
        value: 10000,
        brCode: 'PIX_BRCODE_HERE',
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'createInstallmentCobr',
        id: 'GI_123456789',
        value: 0,
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123456789/cobr',
      body: {},
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when creating CobR without id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'createInstallmentCobr',
        id: '',
        value: 0,
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

  test('should handle URL encoding when creating CobR', async () => {
    const node = new Woovi();
    const specialId = 'GI_123/456';
    const responseData = {
      cobr: {
        globalID: 'Q29icjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
        value: 20000,
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'createInstallmentCobr',
        id: specialId,
        value: 20000,
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123%2F456/cobr',
      body: {
        value: 20000,
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should retry CobR manually', async () => {
    const node = new Woovi();
    const responseData = {
      cobr: {
        globalID: 'Q29icjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
        value: 10000,
        brCode: 'PIX_BRCODE_RETRY',
        pixKey: 'pix.key@example.com',
        status: 'ACTIVE',
        createdAt: '2025-11-18T12:00:00Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'retryInstallmentCobr',
        id: 'GI_123456789',
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
      url: 'https://api.woovi.com/api/v1/installments/GI_123456789/cobr/retry',
      body: {},
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when retrying CobR without id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'retryInstallmentCobr',
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

  test('should handle URL encoding when retrying CobR', async () => {
    const node = new Woovi();
    const specialId = 'GI_123/456';
    const responseData = {
      cobr: {
        globalID: 'Q29icjo2M2UzYjJiNzczZDNkOTNiY2RkMzI5OTM=',
        value: 10000,
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'installment',
        operation: 'retryInstallmentCobr',
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
      method: 'POST',
      url: 'https://api.woovi.com/api/v1/installments/GI_123%2F456/cobr/retry',
      body: {},
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
