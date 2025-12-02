import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - transaction', () => {
  test('should get a transaction by id', async () => {
    const node = new Woovi();
    const responseData = {
      transaction: {
        customer: {},
        payer: {},
        charge: {},
        withdraw: {},
        infoPagador: 'payer info 0',
        value: 100,
        time: '2021-03-03T12:33:00.536Z',
        transactionID: 'transactionID',
        type: 'PAYMENT',
        endToEndId: 'E18236120202012032010s0133872GZA',
        globalID: 'UGl4VHJhbnNhY3Rpb246NzE5MWYxYjAyMDQ2YmY1ZjUzZGNmYTBi',
        creditParty: {},
        debitParty: {},
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'get',
        id: 'transactionID',
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
      url: 'https://api.woovi.com/api/v1/transaction/transactionID',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a transaction by endToEndId', async () => {
    const node = new Woovi();
    const responseData = {
      transaction: {
        value: 100,
        time: '2021-03-03T12:33:00.536Z',
        transactionID: 'transactionID',
        type: 'PAYMENT',
        endToEndId: 'E18236120202012032010s0133872GZA',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'get',
        id: 'E18236120202012032010s0133872GZA',
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
      url: 'https://api.woovi.com/api/v1/transaction/E18236120202012032010s0133872GZA',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when get id is missing', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'get',
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
    ).rejects.toThrow();

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(/O campo "id" é obrigatório/);
  });

  test('should list transactions without filters', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2021-03-03T12:33:00.536Z',
          type: 'PAYMENT',
        },
        {
          transactionID: 'transaction2',
          value: 200,
          time: '2021-03-04T12:33:00.536Z',
          type: 'PAYMENT',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '',
        end: '',
        charge: '',
        pixQrCode: '',
        withdrawal: '',
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
      url: 'https://api.woovi.com/api/v1/transaction?',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list transactions with date filters', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2020-06-03T12:33:00.536Z',
          type: 'PAYMENT',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '2020-01-01T00:00:00Z',
        end: '2020-12-01T17:00:00Z',
        charge: '',
        pixQrCode: '',
        withdrawal: '',
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
      url: 'https://api.woovi.com/api/v1/transaction?start=2020-01-01T00%3A00%3A00Z&end=2020-12-01T17%3A00%3A00Z',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list transactions with charge filter', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2021-03-03T12:33:00.536Z',
          type: 'PAYMENT',
          charge: {
            correlationID: 'charge123',
          },
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '',
        end: '',
        charge: 'Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA',
        pixQrCode: '',
        withdrawal: '',
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
      url: 'https://api.woovi.com/api/v1/transaction?charge=Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list transactions with pixQrCode filter', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2021-03-03T12:33:00.536Z',
          type: 'PAYMENT',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '',
        end: '',
        charge: '',
        pixQrCode: 'Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA',
        withdrawal: '',
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
      url: 'https://api.woovi.com/api/v1/transaction?pixQrCode=Q2hhcmdlOjYwM2U3NDlhNDI1NjAyYmJiZjRlN2JlZA',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list transactions with withdrawal filter', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2021-03-03T12:33:00.536Z',
          type: 'WITHDRAWAL',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '',
        end: '',
        charge: '',
        pixQrCode: '',
        withdrawal: 'E18236120202012032010s0133872GZA',
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
      url: 'https://api.woovi.com/api/v1/transaction?withdrawal=E18236120202012032010s0133872GZA',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list transactions with all filters', async () => {
    const node = new Woovi();
    const responseData = {
      transactions: [
        {
          transactionID: 'transaction1',
          value: 100,
          time: '2020-06-03T12:33:00.536Z',
          type: 'PAYMENT',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'transaction',
        operation: 'list',
        start: '2020-01-01T00:00:00Z',
        end: '2020-12-01T17:00:00Z',
        charge: 'charge123',
        pixQrCode: 'qr123',
        withdrawal: 'withdrawal123',
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
      url: 'https://api.woovi.com/api/v1/transaction?start=2020-01-01T00%3A00%3A00Z&end=2020-12-01T17%3A00%3A00Z&charge=charge123&pixQrCode=qr123&withdrawal=withdrawal123',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
