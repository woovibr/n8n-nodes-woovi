import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - charge', () => {
  test('should create a refund for a charge with required fields', async () => {
    const node = new Woovi();
    const responseData = {
      refund: {
        value: 1000,
        correlationID: 'refund-123',
        chargeId: 'ch-123',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'createRefund',
        chargeId: 'ch-123',
        value: '1000',
        correlationID: 'refund-123',
        comment: '',
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
      url: 'https://api.woovi.com/api/v1/charge/ch-123/refund',
      body: {
        value: '1000',
        correlationID: 'refund-123',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a charge by id', async () => {
    const node = new Woovi();
    const responseData = {
      charge: {
        id: 'ch-123',
        value: 100,
        status: 'ACTIVE',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'get',
        chargeId: 'ch-123',
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
      url: 'https://api.woovi.com/api/v1/charge/ch-123',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list charges without filters', async () => {
    const node = new Woovi();
    const responseData = [
      {
        id: 'ch-1',
        value: 100,
        status: 'ACTIVE',
      },
      {
        id: 'ch-2',
        value: 200,
        status: 'COMPLETED',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'list',
        start: '',
        end: '',
        status: '',
        customer: '',
        subscription: '',
        limit: 20,
        skip: 0,
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
      url: 'https://api.woovi.com/api/v1/charge?limit=20&skip=0',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should list refunds for a charge', async () => {
    const node = new Woovi();
    const responseData = [
      {
        value: 1000,
        correlationID: 'refund-1',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'listRefunds',
        chargeId: 'ch-123',
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
      url: 'https://api.woovi.com/api/v1/charge/ch-123/refund',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should create a charge with optional fields and return_existing', async () => {
    const node = new Woovi();
    const responseData = {
      charge: {
        value: 2000,
        correlationID: 'ch-abc',
        id: 'ch-abc-id',
      },
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'create',
        chargeValue: 2000,
        correlationID: 'ch-abc',
        type: 'OVERDUE',
        comment: 'Test charge',
        expiresIn: 600,
        expiresDate: '2025-12-05T12:00:00.000Z',
        returnExisting: true,
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          taxID: '12345678900',
          correlationID: 'cust-123',
          address: {
            zipcode: '01234-567',
            street: 'Test St',
            number: '1',
            neighborhood: 'Test',
            city: 'TestCity',
            state: 'SP',
            country: 'BR',
            complement: 'Apt 1',
          },
          ensureSameTaxID: true,
        },
        daysForDueDate: 3,
        daysAfterDueDate: 5,
        interests: { value: 100 },
        fines: { value: 50 },
        discountSettings: {
          modality: 'FIXED_VALUE_UNTIL_SPECIFIED_DATE',
          discountFixedDate: [{ discount: [{ daysActive: 2, value: 500 }] }],
        },
        additionalInfo: [{ info: [{ key: 'origin', value: 'api' }] }],
        enableCashbackPercentage: true,
        enableCashbackExclusivePercentage: false,
        subaccount: 'pix-sub-1',
        splits: [
          {
            split: [
              {
                value: 500,
                pixKey: 'pix-1',
                splitType: 'SPLIT_INTERNAL_TRANSFER',
              },
            ],
          },
        ],
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
      url: 'https://api.woovi.com/api/v1/charge?return_existing=true',
    });
    expect(context.lastRequestOptions?.body).toMatchObject({
      value: 2000,
      correlationID: 'ch-abc',
      type: 'OVERDUE',
      comment: 'Test charge',
      expiresIn: 600,
      expiresDate: '2025-12-05T12:00:00.000Z',
      customer: {
        name: 'John Doe',
        taxID: '12345678900',
        email: 'john@example.com',
        correlationID: 'cust-123',
      },
      daysForDueDate: 3,
      daysAfterDueDate: 5,
      interests: { value: 100 },
      fines: { value: 50 },
      enableCashbackPercentage: true,
      enableCashbackExclusivePercentage: false,
      subaccount: 'pix-sub-1',
      splits: [
        {
          split: [
            {
              value: 500,
              pixKey: 'pix-1',
              splitType: 'SPLIT_INTERNAL_TRANSFER',
            },
          ],
        },
      ],
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should list charges with filters', async () => {
    const node = new Woovi();
    const responseData = [
      {
        id: 'ch-1',
        value: 100,
        status: 'ACTIVE',
      },
    ];

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'list',
        start: '2020-01-01T00:00:00Z',
        end: '2020-12-01T17:00:00Z',
        status: 'ACTIVE',
        customer: 'cust-123',
        subscription: 'subs-123',
        limit: 10,
        skip: 0,
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
      url: 'https://api.woovi.com/api/v1/charge?start=2020-01-01T00%3A00%3A00Z&end=2020-12-01T17%3A00%3A00Z&status=ACTIVE&subscription=subs-123&limit=10&skip=0',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should throw if start or end dates are not RFC3339', async () => {
    const node = new Woovi();

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'list',
        start: 'invalid',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'token',
      },
      response: {},
    });

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow();
    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(/The "start" field must be a valid RFC3339 date-time/);
  });

  test('should update charge expiration date', async () => {
    const node = new Woovi();
    const responseData = {
      charge: {
        id: 'ch-123',
        expiresDate: '2025-12-05T12:00:00.000Z',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'updateChargeExpiration',
        chargeId: 'ch-123',
        expiresDate: '2025-12-05T12:00:00.000Z',
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
      method: 'PATCH',
      url: 'https://api.woovi.com/api/v1/charge/ch-123',
      body: {
        expiresDate: '2025-12-05T12:00:00.000Z',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should delete a charge', async () => {
    const node = new Woovi();
    const responseData = { status: 'OK', id: 'ch-123' };
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'deleteCharge',
        chargeId: 'ch-123',
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
      method: 'DELETE',
      url: 'https://api.woovi.com/api/v1/charge/ch-123',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a charge QR code image', async () => {
    const node = new Woovi();
    const responseData = 'image-binary-data';

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'getQrImage',
        id: 'ch-123',
        size: 250,
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
      url: 'https://api.woovi.com/api/openpix/charge/brcode/image/ch-123?size=250',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a charge base64 QR code image', async () => {
    const node = new Woovi();
    const responseData = 'base64-image-string';

    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'getQrImageBase64',
        id: 'fe7834b4060c488a9b0f89811be5f5cf',
        size: 768,
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
      url: 'https://api.woovi.com/api/image/qrcode/base64/fe7834b4060c488a9b0f89811be5f5cf?size=768',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw when chargeId is missing for refund', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'createRefund',
        chargeId: '',
        value: '1000',
        correlationID: 'refund-123',
        comment: '',
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
  });

  test('should throw when chargeId is missing for QR image', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'getQrImage',
        chargeId: '',
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
  });
});
