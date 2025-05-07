import nock from 'nock';
import {executeWorkflow} from '../../../test/executeWorkflow';
import {chargeResult, chargeWithCustomBaseUrlResult, wooviWorkflow, workflowWithoutValue} from "./__mocks__";

describe("Woovi node", () => {
  test('should create a charge', async () => {
    const scope = nock('https://api.woovi.com/api')
      .post('/v1/charge', {
        value: 1000,
        correlationID: '12345',
      })
      .matchHeader('Authorization', 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS')
      .reply(200, chargeResult);

    const {result} = await executeWorkflow({
      ...wooviWorkflow, credentials: {
        wooviApi: {
          baseUrl: 'https://api.woovi.com/api',
          Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
        },
      }
    });
    const nodeResults = result.data.resultData.runData['Woovi'];
    expect(nodeResults.length).toBe(1);
    expect(nodeResults[0].executionStatus).toBe('success');
    expect(nodeResults[0].data?.main[0]?.[0].json).toEqual(JSON.stringify(chargeResult));
    expect(scope.isDone()).toBe(true);
  });

  test('should create a charge with custom baseURL', async () => {
    const scope = nock('https://api.woovi.com/custom/api')
      .post('/v1/charge', {
        value: 1000,
        correlationID: '12345',
      })
      .matchHeader('Authorization', 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS')
      .reply(200, chargeWithCustomBaseUrlResult);

    const {result} = await executeWorkflow({
      ...wooviWorkflow, credentials: {
        wooviApi: {
          baseUrl: 'https://api.woovi.com/custom/api',
          Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
        },
      }
    });

    const nodeResults = result.data.resultData.runData['Woovi'];
    expect(nodeResults.length).toBe(1);
    expect(nodeResults[0].executionStatus).toBe('success');
    expect(nodeResults[0].data?.main[0]?.[0].json).toEqual(JSON.stringify(chargeWithCustomBaseUrlResult));
    expect(scope.isDone()).toBe(true);
  });

  test('should handle API errors appropriately', async () => {
    const scope = nock('https://api.woovi.com/api')
      .post('/v1/charge')
      .reply(400, {error: 'Invalid request'});

    const {result} = await executeWorkflow({
      ...wooviWorkflow,
      credentials: {
        wooviApi: {
          baseUrl: 'https://api.woovi.com/api',
          Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS'
        }
      }
    });

    const nodeResults = result.data.resultData.runData['Woovi'];
    expect(nodeResults[0].executionStatus).toBe('error');
  });

})
