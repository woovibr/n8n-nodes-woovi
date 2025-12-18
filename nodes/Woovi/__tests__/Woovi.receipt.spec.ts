import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - receipt', () => {
  test('should get receipt pdf', async () => {
    const node = new Woovi();
    const responseData = 'receipt-binary-data';
    const context = createExecuteContext({
      parameters: {
        resource: 'receipt',
        operation: 'getReceiptPdf',
        receiptType: 'pix-in',
        endToEndId: 'E12345678202406201221abcdef12345',
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
      url: 'https://api.woovi.com/api/v1/receipt/pix-in/E12345678202406201221abcdef12345',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when endToEndId missing', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'receipt',
        operation: 'getReceiptPdf',
        receiptType: 'pix-in',
        endToEndId: '',
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
    ).rejects.toThrow(/endToEndId é obrigatório/);
  });

  test('should throw error when receiptType invalid', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'receipt',
        operation: 'getReceiptPdf',
        receiptType: 'invalid',
        endToEndId: 'E123',
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
    ).rejects.toThrow(/receiptType inválido/);
  });
});
