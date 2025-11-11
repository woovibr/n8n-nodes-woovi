import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - refund', () => {
  test('should create a refund with required fields', async () => {
    const node = new Woovi();
    const responseData = {
      refund: {
        value: 1000,
        correlationID: 'refund-123',
        transactionEndToEndId: 'E12345678912345678901234567890AB',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'createRefund',
        value: '1000',
        correlationID: 'refund-123',
        transactionEndToEndId: 'E12345678912345678901234567890AB',
        comment: '',
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
      url: 'https://api.woovi.com/api/v1/refund',
      body: {
        value: '1000',
        correlationID: 'refund-123',
        transactionEndToEndId: 'E12345678912345678901234567890AB',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create a refund with comment', async () => {
    const node = new Woovi();
    const responseData = {
      refund: {
        value: 2500,
        correlationID: 'refund-456',
        transactionEndToEndId: 'E98765432198765432109876543210BA',
        comment: 'Refund requested by customer',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'createRefund',
        value: '2500',
        correlationID: 'refund-456',
        transactionEndToEndId: 'E98765432198765432109876543210BA',
        comment: 'Refund requested by customer',
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
      url: 'https://api.woovi.com/api/v1/refund',
      body: {
        value: '2500',
        correlationID: 'refund-456',
        transactionEndToEndId: 'E98765432198765432109876543210BA',
        comment: 'Refund requested by customer',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list refunds with default pagination', async () => {
    const node = new Woovi();
    const responseData = [
      {
        value: 1000,
        status: 'REFUNDED',
        correlationID: 'refund-1',
        refundId: 'ref-uuid-123',
        time: '2025-11-10T10:00:00Z',
        comment: 'Customer requested refund',
      },
      {
        value: 2500,
        status: 'IN_PROCESSING',
        correlationID: 'refund-2',
        refundId: 'ref-uuid-456',
        time: '2025-11-10T11:30:00Z',
        comment: '',
      },
    ];
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'listRefunds',
        limit: 20,
        skip: 0,
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
      url: 'https://api.woovi.com/api/v1/refund?limit=20&skip=0',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should list refunds with custom pagination', async () => {
    const node = new Woovi();
    const responseData = [
      {
        value: 500,
        status: 'NOT_ACCOMPLISHED',
        correlationID: 'refund-11',
        refundId: 'ref-uuid-789',
        time: '2025-11-09T15:45:00Z',
        comment: 'Refund failed',
      },
    ];
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'listRefunds',
        limit: 10,
        skip: 10,
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
      url: 'https://api.woovi.com/api/v1/refund?limit=10&skip=10',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should get a refund by id', async () => {
    const node = new Woovi();
    const responseData = {
      refund: {
        correlationID: 'refund-789',
        value: 3000,
        status: 'COMPLETED',
        transactionEndToEndId: 'E11111111111111111111111111111AA',
        comment: 'Product return',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'getRefund',
        id: 'refund-789',
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
      url: 'https://api.woovi.com/api/v1/refund/refund-789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when getting refund without id', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'refund',
        operation: 'getRefund',
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
});
