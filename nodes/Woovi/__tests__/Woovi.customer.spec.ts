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

  test('should list customers', async () => {
    const node = new Woovi();
    const responseData = [
      {
        correlationID: 'customer-1',
        name: 'John Doe',
        taxID: '12345678900',
      },
      {
        correlationID: 'customer-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    ];
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'listCustomers',
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
      url: 'https://api.woovi.com/api/v1/customer',
    });
    expect(result[0].map((item) => item.json)).toEqual(responseData);
  });

  test('should get a customer by id', async () => {
    const node = new Woovi();
    const responseData = {
      customer: {
        correlationID: 'customer-123',
        name: 'John Doe',
        taxID: '12345678900',
        email: 'john@example.com',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'getCustomer',
        id: 'customer-123',
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
      url: 'https://api.woovi.com/api/v1/customer/customer-123',
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw a error if dont pass id in get a customer', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'getCustomer',
        id: '',
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
    ).rejects.toThrow(/O campo id é obrigatório/);
  });

  test('should update a customer', async () => {
    const node = new Woovi();
    const responseData = {
      customer: {
        correlationID: 'customer-456',
        name: 'John Updated',
        taxID: '12345678900',
        email: 'john.updated@example.com',
      },
    };
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'updateCustomer',
        correlationID: 'customer-456',
        name: 'John Updated',
        taxID: '12345678900',
        email: 'john.updated@example.com',
        phone: '',
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
      method: 'PATCH',
      url: 'https://api.woovi.com/api/v1/customer/customer-456',
      body: {
        name: 'John Updated',
        taxID: '12345678900',
        email: 'john.updated@example.com',
      },
    });
    expect(result[0][0].json).toEqual(responseData);
  });

  test('should throw error when updating customer without correlationID', async () => {
    const node = new Woovi();
    const context = createExecuteContext({
      parameters: {
        resource: 'customer',
        operation: 'updateCustomer',
        correlationID: '',
        name: 'Test',
        taxID: '',
        email: '',
        phone: '',
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
      response: {},
    });

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(NodeApiError);

    await expect(
      node.execute.call(context as unknown as IExecuteFunctions),
    ).rejects.toThrow(/correlationID é obrigatório/);
  });
});
