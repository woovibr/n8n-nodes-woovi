import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - decode', () => {
  test('should parse EMV (PIX) QR', async () => {
    const node = new Woovi();
    const responseData = { parsed: { txid: '123', value: 100 } };
    const context = createExecuteContext({
      parameters: {
        resource: 'decode',
        operation: 'emv',
        emv: '000201...',
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
      url: 'https://api.woovi.com/api/v1/decode/emv',
      body: { emv: '000201...' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error if emv is missing', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'decode',
        operation: 'emv',
        emv: '',
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
    ).rejects.toThrow(/O campo emv é obrigatório/);
  });
});
