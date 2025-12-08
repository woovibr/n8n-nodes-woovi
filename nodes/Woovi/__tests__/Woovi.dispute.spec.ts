import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - dispute', () => {
  test('should list disputes with start and end dates', async () => {
    const node = new Woovi();
    const responseData = { disputes: [{ endToEndId: 'd-1' }] };

    const context = createExecuteContext({
      parameters: {
        resource: 'dispute',
        operation: 'list',
        start: '2020-01-01T00:00:00Z',
        end: '2020-12-01T17:00:00Z',
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
      url: 'https://api.woovi.com/api/v1/dispute',
      qs: { start: '2020-01-01T00:00:00Z', end: '2020-12-01T17:00:00Z' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get a dispute by id', async () => {
    const node = new Woovi();
    const responseData = { dispute: { endToEndId: 'd-1' } };

    const context = createExecuteContext({
      parameters: {
        resource: 'dispute',
        operation: 'get',
        id: 'd-1',
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
      url: 'https://api.woovi.com/api/v1/dispute/d-1',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should upload dispute evidence', async () => {
    const node = new Woovi();
    const responseData = { documents: [{ url: 'https://example.com/doc1' }] };

    const context = createExecuteContext({
      parameters: {
        resource: 'dispute',
        operation: 'uploadEvidence',
        id: 'd-1',
        documents: [
          {
            document: {
              url: 'https://example.com/doc1',
              correlationID: 'c-1',
              description: 'desc',
            },
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
      url: 'https://api.woovi.com/api/v1/dispute/d-1/evidence',
      body: {
        documents: [
          {
            url: 'https://example.com/doc1',
            correlationID: 'c-1',
            description: 'desc',
          },
        ],
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
