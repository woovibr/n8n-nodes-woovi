import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - transfer', () => {
  test('should create a transfer', async () => {
    const node = new Woovi();
    const responseData = {
      transaction: { value: 100, correlationID: 'corr-1' },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'transfer',
        operation: 'create',
        value: 100,
        fromPixKey: 'from@openpix.com.br',
        toPixKey: 'to@openpix.com.br',
        correlationID: 'corr-1',
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
      url: 'https://api.woovi.com/api/v1/transfer',
      body: {
        value: 100,
        fromPixKey: 'from@openpix.com.br',
        toPixKey: 'to@openpix.com.br',
        correlationID: 'corr-1',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error if value is missing', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'transfer',
        operation: 'create',
        // value missing
        fromPixKey: 'from@openpix.com.br',
        toPixKey: 'to@openpix.com.br',
        correlationID: 'corr-1',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: {},
    });

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(NodeApiError);

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(/O campo value é obrigatório/);
  });
});
