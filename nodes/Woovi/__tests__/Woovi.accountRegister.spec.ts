import type { IExecuteFunctions } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - account register', () => {
  test('should create account register', async () => {
    const node = new Woovi();
    const responseData = { id: 'acc1', status: 'PENDING' };
    const context = createExecuteContext({
      parameters: {
        resource: 'accountRegister',
        operation: 'create',
        officialName: 'Test Ltd',
        tradeName: 'Test',
        taxID: '123456789',
        billingAddress: {
          zipcode: '12345',
          street: 'Main',
          number: '1',
          neighborhood: 'Center',
          city: 'City',
          state: 'ST',
        },
        documents: {
          document: [
            {
              url: 'http://example.com/doc.pdf',
              type: 'SOCIAL_CONTRACT',
            },
          ],
        },
        representatives: {
          representative: [
            {
              name: 'John',
              taxID: '987654321',
              email: 'john@example.com',
              birthDate: '1990-01-01',
              type: 'ADMIN',
            },
          ],
        },
        businessDescription: 'E-commerce',
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
      url: 'https://api.woovi.com/api/v1/account-register',
      body: {
        officialName: 'Test Ltd',
        tradeName: 'Test',
        taxID: '123456789',
        billingAddress: {
          zipcode: '12345',
          street: 'Main',
          number: '1',
          neighborhood: 'Center',
          city: 'City',
          state: 'ST',
        },
        documents: [
          { url: 'http://example.com/doc.pdf', type: 'SOCIAL_CONTRACT' },
        ],
        representatives: [
          {
            name: 'John',
            taxID: '987654321',
            email: 'john@example.com',
            birthDate: '1990-01-01',
            type: 'ADMIN',
          },
        ],
        businessDescription: 'E-commerce',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should get account register by taxID', async () => {
    const node = new Woovi();
    const responseData = { id: 'acc1', taxID: '123456789' };
    const context = createExecuteContext({
      parameters: {
        resource: 'accountRegister',
        operation: 'getByTaxId',
        taxID: '123456789',
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
      url: 'https://api.woovi.com/api/v1/account-register/123456789',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should update account register', async () => {
    const node = new Woovi();
    const responseData = { id: 'acc1', status: 'UPDATED' };
    const context = createExecuteContext({
      parameters: {
        resource: 'accountRegister',
        operation: 'update',
        taxID: 'acc1',
        businessDescription: 'Updated',
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
      url: 'https://api.woovi.com/api/v1/account-register/acc1',
      body: { businessDescription: 'Updated' },
    });
    expect(result[0][0].json).toEqual(responseData);
  });
});
