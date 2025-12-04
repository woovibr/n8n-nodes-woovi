import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';
import { chargeResult, chargeWithCustomBaseUrlResult } from './__mocks__';

describe('Woovi node', () => {
  test('should create a charge', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'create',
        chargeValue: 1000,
        correlationID: '12345',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
      },
      response: chargeResult,
    });

    const response = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'POST',
      body: { value: 1000, correlationID: '12345' },
      headers: {
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
        platform: 'N8N',
      },
    });
    expect(context.lastRequestOptions?.url).toMatch(
      /^https:\/\/api\.woovi\.com\/api\/v1\/charge(\?.*)?$/,
    );
    expect(response[0][0].json).toEqual(chargeResult);
  });

  test('should create a charge with custom baseURL', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'create',
        chargeValue: 1000,
        correlationID: '12345',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/custom/api',
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
      },
      response: chargeWithCustomBaseUrlResult,
    });

    const response = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions?.url).toMatch(
      /^https:\/\/api\.woovi\.com\/custom\/api\/v1\/charge(\?.*)?$/,
    );
    expect(response[0][0].json).toEqual(chargeWithCustomBaseUrlResult);
  });

  test('should handle API errors appropriately', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'charge',
        operation: 'create',
        chargeValue: 1000,
        correlationID: '12345',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
      },
      error: new Error('Invalid request'),
    });

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toBeInstanceOf(NodeApiError);
  });
});
