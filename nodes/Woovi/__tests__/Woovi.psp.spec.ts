import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - psp', () => {
  test('should list PSPs with filters', async () => {
    const node = new Woovi();
    const responseData = {
      success: true,
      psps: [
        {
          name: 'BCO DO BRASIL S.A.',
          ispb: '00000000',
          code: '00000000',
          compe: '001',
        },
      ],
    };

    const context = createExecuteContext({
      parameters: {
        resource: 'psp',
        operation: 'list',
        ispb: '00000000',
        name: '',
        compe: '',
      },
      credentials: {
        baseUrl: 'https://api.woovi.com/api',
        Authorization: 'Q2xpZW50X0lk',
      },
      response: responseData,
    });

    const result = await node.execute.call(
      context as unknown as IExecuteFunctions,
    );

    expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(1);
    expect(context.lastRequestOptions).toMatchObject({
      method: 'GET',
      url: 'https://api.woovi.com/api/v1/psp?ispb=00000000',
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
