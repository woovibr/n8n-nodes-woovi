import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - customer', () => {
  test('should create a customer with required fields only', async () => {
    const node = new Woovi();
    const responseData = {
      customer: {
        name: 'John Doe',
        taxID: '12345678900',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'createCustomer',
        name: 'John Doe',
        taxID: '12345678900',
        email: '',
        phone: '',
        correlationID: '',
        address: {
          zipcode: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          country: '',
          complement: '',
        },
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
      url: 'https://api.woovi.com/api/v1/customer',
      body: {
        name: 'John Doe',
        taxID: '12345678900',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should create a customer with complete address', async () => {
    const node = new Woovi();
    const responseData = {
      customer: {
        name: 'Alice Smith',
        taxID: '11122233344',
        address: {
          zipcode: '12345-678',
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          country: 'BR',
          complement: 'Apto 101',
        },
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'createCustomer',
        name: 'Alice Smith',
        taxID: '11122233344',
        email: '',
        phone: '',
        correlationID: '',
        address: {
          zipcode: '12345-678',
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          country: 'BR',
          complement: 'Apto 101',
        },
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
      url: 'https://api.woovi.com/api/v1/customer',
      body: {
        name: 'Alice Smith',
        taxID: '11122233344',
        address: {
          zipcode: '12345-678',
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          country: 'BR',
          complement: 'Apto 101',
        },
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when address is incomplete', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'createCustomer',
        name: 'Invalid User',
        taxID: '99988877766',
        email: '',
        phone: '',
        correlationID: '',
        address: {
          zipcode: '12345-678',
          street: 'Rua Teste',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          country: '',
          complement: '',
        },
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
    ).rejects.toThrow(/Endereço incompleto/);
  });
});
