import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - qrCodeStatic', () => {
  test('should get a static QR code', async () => {
    const node = new Woovi();
    const responseData = {
      qrCode: {
        id: 'test-qr-id',
        name: 'Test QR Code',
        correlationID: 'test-correlation',
        value: 1000,
        status: 'ACTIVE',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'qrCodeStatic',
        operation: 'get',
        qrCodeId: 'test-qr-id',
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
      url: 'https://api.woovi.com/api/v1/qrcode-static/test-qr-id',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error if qrCodeId is missing', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'qrCodeStatic',
        operation: 'get',
        qrCodeId: '',
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
    ).rejects.toThrow(/O campo qrCodeId é obrigatório/);
  });
});
