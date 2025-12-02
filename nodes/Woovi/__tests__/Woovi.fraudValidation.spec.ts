import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - fraudValidation', () => {
  test('should validate taxId', async () => {
    const node = new Woovi();
    const responseData = {
      isValid: true,
      score: 100,
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'fraudValidation',
        operation: 'validateTaxId',
        taxId: '12345678900',
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
      url: 'https://api.woovi.com/api/v1/fraud-validation/taxId/12345678900',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should validate pixKey', async () => {
    const node = new Woovi();
    const responseData = {
      isValid: true,
      score: 95,
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'fraudValidation',
        operation: 'validatePixKey',
        pixKey: 'test-pix-key',
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
      url: 'https://api.woovi.com/api/v1/fraud-validation/pix-key/test-pix-key',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
