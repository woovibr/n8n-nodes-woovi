import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - cashback fidelity', () => {
  test('should get cashback balance by taxID', async () => {
    const node = new Woovi();
    const responseData = { cashback: { value: 100 }, message: 'OK' };
    const context = createExecuteContext({
      parameters: {
        resource: 'cashbackFidelity',
        operation: 'getByTaxId',
        taxID: '123456789',
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
      method: 'GET',
      url: 'https://api.woovi.com/api/v1/cashback-fidelity/balance/123456789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create cashback for taxID', async () => {
    const node = new Woovi();
    const responseData = { cashback: { value: 100 }, message: 'CREATED' };
    const context = createExecuteContext({
      parameters: {
        resource: 'cashbackFidelity',
        operation: 'create',
        taxID: '123456789',
        value: 100,
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
      url: 'https://api.woovi.com/api/v1/cashback-fidelity',
      body: {
        taxID: '123456789',
        value: 100,
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
