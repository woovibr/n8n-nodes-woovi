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
        correlationIDRefund: 'refund-123',
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

  test('should throw when chargeId is missing for refund', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'createRefund',
        chargeId: '',
        value: '1000',
        correlationIDRefund: 'refund-123',
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
});
