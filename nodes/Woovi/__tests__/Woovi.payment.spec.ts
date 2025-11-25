import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - payment', () => {
  test('should create a PIX_KEY payment request', async () => {
    const node = new Woovi();
    const responseData = {
      payment: {
        value: 100,
        status: 'CREATED',
        destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        destinationAliasType: 'RANDOM',
        comment: 'payment comment',
        correlationID: 'payment1',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'PIX_KEY',
        value: 100,
        destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        destinationAliasType: 'RANDOM',
        correlationID: 'payment1',
        comment: 'payment comment',
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
      url: 'https://api.woovi.com/api/v1/payment',
      body: {
        type: 'PIX_KEY',
        value: 100,
        destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        destinationAliasType: 'RANDOM',
        correlationID: 'payment1',
        comment: 'payment comment',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list payments with filters', async () => {
    const node = new Woovi();
    const responseData = [
      {
        correlationID: 'payment-1',
        value: 100,
        status: 'CREATED',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'list',
        limit: 10,
        skip: 0,
        correlationID: 'payment-1',
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
      url: 'https://api.woovi.com/api/v1/payment?limit=10&skip=0',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should throw error when PIX_KEY missing destinationAlias', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'PIX_KEY',
        value: 100,
        destinationAliasType: 'RANDOM',
        correlationID: 'payment1',
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
    ).rejects.toThrow(/O campo destinationAlias é obrigatório/);
  });

  test('should throw error when QR_CODE missing qrCode', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'QR_CODE',
        value: 100,
        correlationID: 'payment2',
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
    ).rejects.toThrow(/O campo qrCode é obrigatório/);
  });

  test('should create a QR_CODE payment request', async () => {
    const node = new Woovi();
    const responseData = {
      payment: { status: 'CREATED', correlationID: 'payment2' },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'QR_CODE',
        qrCode: 'qr-123',
        correlationID: 'payment2',
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
      url: 'https://api.woovi.com/api/v1/payment',
      body: expect.objectContaining({ qrCode: 'qr-123', type: 'QR_CODE' }),
    });
    // QR_CODE payments must not include a `value` field
    expect(context.lastRequestOptions!.body).not.toHaveProperty('value');
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when MANUAL missing psp', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'MANUAL',
        value: 100,
        correlationID: 'payment3',
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
    ).rejects.toThrow(/O campo psp é obrigatório/);
  });

  test('should create a MANUAL payment request', async () => {
    const node = new Woovi();
    const responseData = {
      payment: { status: 'CREATED', correlationID: 'payment4' },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'MANUAL',
        value: 100,
        psp: 'psp-123',
        holder: { name: 'John', taxID: '123' },
        account: { bank: 'A Bank', branch: '1', accountNumber: '123456' },
        correlationID: 'payment4',
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
      url: 'https://api.woovi.com/api/v1/payment',
      body: expect.objectContaining({ psp: 'psp-123', type: 'MANUAL' }),
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a payment by id', async () => {
    const node = new Woovi();
    const responseData = {
      payment: {
        value: 100,
        status: 'CONFIRMED',
        destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        comment: 'payment comment',
        correlationID: 'payment1',
        sourceAccountId: 'my-source-account-id',
      },
      transaction: {
        value: 100,
        endToEndId: 'transaction-end-to-end-id',
        time: '2023-03-20T13:14:17.000Z',
      },
      destination: {
        name: 'Dan',
        taxID: '31324227036',
        pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        bank: 'A Bank',
        branch: '1',
        account: '123456',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'get',
        id: 'payment1',
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
      url: 'https://api.woovi.com/api/v1/payment/payment1',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when get id is missing', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
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

  test('should throw error when metadata is invalid JSON', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'PIX_KEY',
        value: 100,
        destinationAlias: 'alias',
        destinationAliasType: 'RANDOM',
        correlationID: 'payment1',
        metadata: '{invalid}',
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
    ).rejects.toThrow(/O campo metadata deve ser uma string JSON válida/);
  });

  test('should throw error when correlationID is missing', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'PIX_KEY',
        value: 100,
        destinationAlias: 'alias',
        destinationAliasType: 'RANDOM',
        correlationID: '',
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
    ).rejects.toThrow(/O campo correlationID é obrigatório/);
  });

  test('should approve a payment request', async () => {
    const node = new Woovi();
    const responseData = {
      payment: {
        value: 100,
        status: 'APPROVED',
        destinationAlias: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        comment: 'payment comment',
        correlationID: 'payment1',
      },
      transaction: {
        value: 100,
        endToEndId: 'transaction-end-to-end-id',
        time: '2023-03-20T13:14:17.000Z',
      },
      destination: {
        name: 'Dan',
        taxID: '31324227036',
        pixKey: 'c4249323-b4ca-43f2-8139-8232aab09b93',
        bank: 'A Bank',
        branch: '1',
        account: '123456',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'approve',
        correlationID: 'payment1',
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
      url: 'https://api.woovi.com/api/v1/payment/approve',
      body: { correlationID: 'payment1' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when approve correlationID is missing', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'approve',
        correlationID: '',
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
    ).rejects.toThrow(/O campo correlationID é obrigatório/);
  });
});
