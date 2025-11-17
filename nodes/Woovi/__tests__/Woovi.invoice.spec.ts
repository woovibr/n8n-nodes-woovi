import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { Woovi } from '../Woovi.node';
import { createExecuteContext } from './helpers/mockExecuteContext';

describe('Woovi node - invoice', () => {
  describe('createInvoice', () => {
    test('should create an invoice with charge', async () => {
      const node = new Woovi();
      const responseData = {
        invoice: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-123',
          charge: 'charge-abc',
          status: 'ACTIVE',
        },
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: 'Service invoice',
          billingDate: '2025-12-31',
          correlationID: 'invoice-123',
          charge: 'charge-abc',
          value: 0,
          customerId: '',
          customer: {},
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'POST',
        url: 'https://api.woovi.com/api/v1/invoice',
        body: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-123',
          description: 'Service invoice',
          charge: 'charge-abc',
        },
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should create an invoice with value', async () => {
      const node = new Woovi();
      const responseData = {
        invoice: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-456',
          value: 10000,
          status: 'ACTIVE',
        },
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '2025-12-31',
          correlationID: 'invoice-456',
          charge: '',
          value: 10000,
          customerId: '',
          customer: {},
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'POST',
        url: 'https://api.woovi.com/api/v1/invoice',
        body: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-456',
          value: 10000,
        },
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should create an invoice with customerId', async () => {
      const node = new Woovi();
      const responseData = {
        invoice: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-789',
          charge: 'charge-xyz',
          customerId: 'customer-123',
          status: 'ACTIVE',
        },
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: 'Monthly subscription',
          billingDate: '2025-12-31',
          correlationID: 'invoice-789',
          charge: 'charge-xyz',
          value: 0,
          customerId: 'customer-123',
          customer: {},
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'POST',
        url: 'https://api.woovi.com/api/v1/invoice',
        body: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-789',
          description: 'Monthly subscription',
          charge: 'charge-xyz',
          customerId: 'customer-123',
        },
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should create an invoice with complete customer data', async () => {
      const node = new Woovi();
      const responseData = {
        invoice: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-abc',
          value: 5000,
          customer: {
            taxID: '12345678900',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+5511999999999',
          },
          status: 'ACTIVE',
        },
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: 'Invoice with customer',
          billingDate: '2025-12-31',
          correlationID: 'invoice-abc',
          charge: '',
          value: 5000,
          customerId: '',
          customer: {
            taxID: '12345678900',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+5511999999999',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'POST',
        url: 'https://api.woovi.com/api/v1/invoice',
        body: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-abc',
          description: 'Invoice with customer',
          value: 5000,
          customer: {
            taxID: '12345678900',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+5511999999999',
          },
        },
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should create an invoice with customer and complete address', async () => {
      const node = new Woovi();
      const responseData = {
        invoice: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-def',
          value: 7500,
          customer: {
            taxID: '98765432100',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+5511888888888',
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
          status: 'ACTIVE',
        },
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: 'Invoice with full customer',
          billingDate: '2025-12-31',
          correlationID: 'invoice-def',
          charge: '',
          value: 7500,
          customerId: '',
          customer: {
            taxID: '98765432100',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+5511888888888',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'POST',
        url: 'https://api.woovi.com/api/v1/invoice',
        body: {
          billingDate: '2025-12-31',
          correlationID: 'invoice-def',
          description: 'Invoice with full customer',
          value: 7500,
          customer: {
            taxID: '98765432100',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+5511888888888',
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
        },
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should throw error when billingDate is missing', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '',
          correlationID: 'invoice-err',
          charge: 'charge-123',
          value: 0,
          customerId: '',
          customer: {},
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
      ).rejects.toThrow(/Billing Date.*obrigatório/);
    });

    test('should throw error when correlationID is missing', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '2025-12-31',
          correlationID: '',
          charge: 'charge-123',
          value: 0,
          customerId: '',
          customer: {},
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
      ).rejects.toThrow(/Correlation ID.*obrigatório/);
    });

    test('should throw error when both charge and value are missing', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '2025-12-31',
          correlationID: 'invoice-err',
          charge: '',
          value: 0,
          customerId: '',
          customer: {},
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
      ).rejects.toThrow(/Charge.*Value.*deve ser fornecido/);
    });

    test('should throw error when customer data is incomplete', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '2025-12-31',
          correlationID: 'invoice-err',
          charge: 'charge-123',
          value: 0,
          customerId: '',
          customer: {
            taxID: '12345678900',
            name: 'John Doe',
            email: '',
            phone: '',
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
      ).rejects.toThrow(/Customer incompleto.*Campos obrigatórios faltando/);
    });

    test('should throw error when customer address is incomplete', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'createInvoice',
          description: '',
          billingDate: '2025-12-31',
          correlationID: 'invoice-err',
          charge: 'charge-123',
          value: 0,
          customerId: '',
          customer: {
            taxID: '12345678900',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+5511999999999',
            address: {
              zipcode: '12345-678',
              street: 'Rua Teste',
              number: '123',
              neighborhood: '',
              city: '',
              state: '',
              country: '',
              complement: '',
            },
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
      ).rejects.toThrow(/Endereço do customer incompleto/);
    });
  });

  describe('getInvoicePdf', () => {
    test('should get invoice PDF with correlationID', async () => {
      const node = new Woovi();
      const responseData = {
        pdf: 'base64encodedpdfcontent',
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'getInvoicePdf',
          correlationID: 'invoice-123',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice/invoice-123/pdf',
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should throw error when correlationID is missing', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'getInvoicePdf',
          correlationID: '',
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
      ).rejects.toThrow(/Correlation ID.*obrigatório/);
    });
  });

  describe('getInvoiceXml', () => {
    test('should get invoice XML with correlationID', async () => {
      const node = new Woovi();
      const responseData = {
        xml: '<?xml version="1.0"?><invoice></invoice>',
      };
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'getInvoiceXml',
          correlationID: 'invoice-456',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice/invoice-456/xml',
      });
      expect(result[0][0].json).toEqual(responseData);
    });

    test('should throw error when correlationID is missing', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'getInvoiceXml',
          correlationID: '',
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
      ).rejects.toThrow(/Correlation ID.*obrigatório/);
    });
  });

  describe('listInvoices', () => {
    test('should list invoices with default pagination', async () => {
      const node = new Woovi();
      const responseData = [
        {
          correlationID: 'invoice-1',
          billingDate: '2025-12-31',
          value: 10000,
          status: 'ACTIVE',
        },
        {
          correlationID: 'invoice-2',
          billingDate: '2025-12-30',
          value: 5000,
          status: 'PAID',
        },
      ];
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '',
          end: '',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice?limit=20&skip=0',
      });
      expect(result[0].map((item) => item.json)).toEqual(responseData);
    });

    test('should list invoices with custom pagination', async () => {
      const node = new Woovi();
      const responseData = [
        {
          correlationID: 'invoice-11',
          billingDate: '2025-11-15',
          value: 7500,
          status: 'ACTIVE',
        },
      ];
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 10,
          skip: 10,
          start: '',
          end: '',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice?limit=10&skip=10',
      });
      expect(result[0].map((item) => item.json)).toEqual(responseData);
    });

    test('should list invoices with date filters', async () => {
      const node = new Woovi();
      const responseData = [
        {
          correlationID: 'invoice-3',
          billingDate: '2025-01-15',
          value: 3000,
          status: 'ACTIVE',
        },
      ];
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '2025-01-01',
          end: '2025-01-31',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice?limit=20&skip=0&start=2025-01-01&end=2025-01-31',
      });
      expect(result[0].map((item) => item.json)).toEqual(responseData);
    });

    test('should list invoices with start date only', async () => {
      const node = new Woovi();
      const responseData = [
        {
          correlationID: 'invoice-4',
          billingDate: '2025-06-15',
          value: 2500,
          status: 'ACTIVE',
        },
      ];
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '2025-06-01',
          end: '',
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

      expect(context.helpers.requestWithAuthentication).toHaveBeenCalledTimes(
        1,
      );
      expect(context.lastRequestOptions).toMatchObject({
        method: 'GET',
        url: 'https://api.woovi.com/api/v1/invoice?limit=20&skip=0&start=2025-06-01',
      });
      expect(result[0].map((item) => item.json)).toEqual(responseData);
    });

    test('should throw error when start date has invalid format', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '2025/01/01',
          end: '',
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
      ).rejects.toThrow(/Start Date.*formato YYYY-MM-DD/);
    });

    test('should throw error when end date has invalid format', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '',
          end: '01-31-2025',
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
      ).rejects.toThrow(/End Date.*formato YYYY-MM-DD/);
    });

    test('should throw error when start date is invalid', async () => {
      const node = new Woovi();
      const context = createExecuteContext({
        parameters: {
          resource: 'invoice',
          operation: 'listInvoices',
          limit: 20,
          skip: 0,
          start: '2025-13-45',
          end: '',
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
      ).rejects.toThrow(/Start Date.*formato YYYY-MM-DD/);
    });
  });
});
