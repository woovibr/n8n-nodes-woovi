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

  test('should throw error when metadata has more than 30 keys', async () => {
    const node = new Woovi();
    const bigMeta: { [k: string]: string } = {};
    for (let i = 0; i < 31; i++) {
      bigMeta[`k${i}`] = `v${i}`;
    }

    const context = createExecuteContext({
      parameters: {
        resource: 'payment',
        operation: 'create',
        paymentType: 'PIX_KEY',
        value: 100,
        destinationAlias: 'alias',
        destinationAliasType: 'RANDOM',
        correlationID: 'payment1',
        metadata: JSON.stringify(bigMeta),
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
    ).rejects.toThrow(/O objeto metadata pode conter no máximo 30 chaves/);
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
});
