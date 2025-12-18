import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - company', () => {
  test('should get company', async () => {
    const node = new Woovi();
    const responseData = { company: { officialName: 'Test Ltd' } };
    const context = createExecuteContext({
      parameters: {
        resource: 'company',
        operation: 'get',
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
      url: 'https://api.woovi.com/api/v1/company',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
