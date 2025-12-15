import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - statement', () => {
  test('should list statement without filters', async () => {
    const node = new Woovi();
    const responseData = [
      {
        id: '507f1f77bcf86cd799439011',
        time: '2023-12-01T10:30:00.000Z',
        description: 'Payment received from customer',
        balance: 1500.5,
        value: 100,
        type: 'CREDIT',
        transactionId: 'txn_123456789',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'statement',
        operation: 'list',
        start: '',
        end: '',
        skip: 0,
        limit: 0,
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
      url: 'https://api.woovi.com/api/v1/statement?skip=0&limit=0',
    });
    expect(result[0][0].json).toEqual(responseData[0]);
  });

  test('should list statement with date filters', async () => {
    const node = new Woovi();
    const responseData = [
      {
        id: '507f1f77bcf86cd799439011',
        time: '2023-12-01T10:30:00.000Z',
        description: 'Payment received from customer',
        balance: 1500.5,
        value: 100,
        type: 'CREDIT',
        transactionId: 'txn_123456789',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'statement',
        operation: 'list',
        start: '2020-01-01T00:00:00Z',
        end: '2020-12-01T17:00:00Z',
        skip: 0,
        limit: 0,
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
      url: 'https://api.woovi.com/api/v1/statement?start=2020-01-01T00%3A00%3A00Z&end=2020-12-01T17%3A00%3A00Z&skip=0&limit=0',
    });
    expect(result[0][0].json).toEqual(responseData[0]);
  });

  test('should list statement with skip and limit', async () => {
    const node = new Woovi();
    const responseData = [
      {
        id: '507f1f77bcf86cd799439011',
        time: '2023-12-01T10:30:00.000Z',
        description: 'Payment received from customer',
        balance: 1500.5,
        value: 100,
        type: 'CREDIT',
        transactionId: 'txn_123456789',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'statement',
        operation: 'list',
        start: '',
        end: '',
        skip: 2,
        limit: 10,
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
      url: 'https://api.woovi.com/api/v1/statement?skip=2&limit=10',
    });
    expect(result[0][0].json).toEqual(responseData[0]);
  });
});
