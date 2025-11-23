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

  test('should list static QR codes', async () => {
    const node = new Woovi();
    const responseData = {
      qrCodes: [
        {
          id: 'qr-1',
          name: 'QR Code 1',
          value: 1000,
          status: 'ACTIVE',
        },
        {
          id: 'qr-2',
          name: 'QR Code 2',
          value: 2000,
          status: 'ACTIVE',
        },
      ],
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'qrCodeStatic',
        operation: 'list',
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
      url: 'https://api.woovi.com/api/v1/qrcode-static?limit=20&skip=0',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create a static QR code', async () => {
    const node = new Woovi();
    const responseData = {
      pixQrCode: {
        name: 'my-qr-code',
        value: 1000,
        comment: 'Test QR Code',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        identifier: 'zr7833b4060c488a9b0f89811',
        paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
        paymentLinkUrl:
          'https://woovi.com/pay/9134e286-6f71-427a-bf00-241681624586',
        qrCodeImage:
          'https://api.woovi.com/openpix/pixQrCode/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
        brCode: '00020101021226...',
        createdAt: '2021-03-02T17:28:51.882Z',
        updatedAt: '2021-03-02T17:28:51.882Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'qrCodeStatic',
        operation: 'create',
        name: 'my-qr-code',
        value: 1000,
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        comment: 'Test QR Code',
        pixKey: '',
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
      url: 'https://api.woovi.com/api/v1/qrcode-static',
      body: {
        name: 'my-qr-code',
        value: 1000,
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        comment: 'Test QR Code',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error if name is missing when creating QR code', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'qrCodeStatic',
        operation: 'create',
        name: '',
        value: 1000,
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
    ).rejects.toThrow(/O campo name é obrigatório/);
  });
});
