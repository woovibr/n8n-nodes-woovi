import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { wooviOperations } from './operations';

export class Woovi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Woovi',
    name: 'woovi',
    icon: 'file:woovi.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Automate Woovi workflow API',
    defaults: {
      name: 'Woovi',
    },
    inputs: ['main'],
    inputNames: ['main'],
    outputs: ['main'],
    outputNames: ['main'],
    credentials: [
      {
        name: 'wooviApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.woovi.com/api',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'n8n',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          { name: 'Charge', value: 'charge' },
          { name: 'Subaccount', value: 'subaccount' },
          { name: 'Customer', value: 'customer' },
          { name: 'Refund', value: 'refund' },
          { name: 'Invoice', value: 'invoice' },
        ],
        default: 'charge',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['charge'],
          },
        },
        options: [{ name: 'Create Charge', value: 'create' }],
        default: 'create',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['subaccount'],
          },
        },
        options: [
          { name: 'List Subaccounts', value: 'listSubaccounts' },
          { name: 'Get Subaccount', value: 'getSubaccount' },
          { name: 'Create/Retrieve Subaccount', value: 'createSubaccount' },
          { name: 'Withdraw from Subaccount', value: 'withdrawSubaccount' },
          { name: 'Debit Subaccount', value: 'debitSubaccount' },
          { name: 'Delete Subaccount', value: 'deleteSubaccount' },
          {
            name: 'Transfer between Subaccounts',
            value: 'transferSubaccounts',
          },
        ],
        default: 'listSubaccounts',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['customer'],
          },
        },
        options: [
          { name: 'List Customers', value: 'listCustomers' },
          { name: 'Get Customer', value: 'getCustomer' },
          { name: 'Create Customer', value: 'createCustomer' },
          { name: 'Update Customer', value: 'updateCustomer' },
        ],
        default: 'listCustomers',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['refund'],
          },
        },
        options: [
          { name: 'List Refunds', value: 'listRefunds' },
          { name: 'Get Refund', value: 'getRefund' },
          { name: 'Create Refund', value: 'createRefund' },
        ],
        default: 'listRefunds',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['invoice'],
          },
        },
        options: [
          { name: 'List Invoices', value: 'listInvoices' },
          { name: 'Cancel Invoice', value: 'cancelInvoice' },
          { name: 'Get Invoice PDF', value: 'getInvoicePdf' },
          { name: 'Get Invoice XML', value: 'getInvoiceXml' },
          { name: 'Create Invoice', value: 'createInvoice' },
        ],
        default: 'listInvoices',
      },
      {
        displayName: 'Value',
        name: 'chargeValue',
        type: 'number',
        required: true,
        default: '',
        placeholder: 'charge value into cents',
        description: 'ChargeValue into cents',
        displayOptions: {
          show: {
            resource: ['charge'],
          },
        },
      },
      {
        displayName: 'CorrelationID',
        name: 'correlationID',
        type: 'string',
        default: '',
        placeholder: 'correlationID',
        description: 'Unique identifier for the charge',
        displayOptions: {
          show: {
            resource: ['charge', 'subaccount', 'customer'],
            operation: ['create', 'transferSubaccounts', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Subaccount ID',
        name: 'subaccountId',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'subaccount id',
        description: 'Subaccount id (used by get/withdraw/debit/delete)',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: [
              'getSubaccount',
              'withdrawSubaccount',
              'debitSubaccount',
              'deleteSubaccount',
            ],
          },
        },
      },
      {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        required: true,
        default: 0,
        description: 'Amount in cents for withdraw/debit/transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: [
              'withdrawSubaccount',
              'debitSubaccount',
              'transferSubaccounts',
            ],
          },
        },
      },
      {
        displayName: 'Pix Key',
        name: 'subaccountPixKey',
        type: 'string',
        required: true,
        default: '',
        description: 'Pix key for create/retrieve subaccount',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['createSubaccount'],
          },
        },
      },
      {
        displayName: 'Subaccount Name',
        name: 'subaccountName',
        type: 'string',
        default: '',
        description: 'Friendly name for the subaccount',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['createSubaccount'],
          },
        },
      },
      {
        displayName: 'To Pix Key',
        name: 'toPixKey',
        type: 'string',
        required: true,
        default: '',
        description: 'Destination pix key for transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'From Pix Key',
        name: 'fromPixKey',
        type: 'string',
        required: true,
        default: '',
        description: 'Source pix key for transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'Description',
        name: 'operationDescription',
        type: 'string',
        default: '',
        description: 'Description for debit or transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['debitSubaccount', 'transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        description: 'Name of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer'],
          },
        },
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['updateCustomer'],
          },
        },
      },
      {
        displayName: 'taxID',
        name: 'taxID',
        type: 'string',
        default: '',
        description: 'Tax ID of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Email of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'collection',
        default: {
          zipcode: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          country: '',
          complement: '',
        },
        options: [
          {
            displayName: 'Zipcode',
            name: 'zipcode',
            type: 'string',
            default: '',
            description: 'Postal code',
          },
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
            description: 'Street name',
          },
          {
            displayName: 'Number',
            name: 'number',
            type: 'string',
            default: '',
            description: 'Street number',
          },
          {
            displayName: 'Neighborhood',
            name: 'neighborhood',
            type: 'string',
            default: '',
            description: 'Neighborhood/District',
          },
          {
            displayName: 'City',
            name: 'city',
            type: 'string',
            default: '',
            description: 'City name',
          },
          {
            displayName: 'State',
            name: 'state',
            type: 'string',
            default: '',
            description: 'State/Province',
          },
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: '',
            description: 'Country',
          },
          {
            displayName: 'Complement',
            name: 'complement',
            type: 'string',
            default: '',
            description: 'Additional address information (optional)',
          },
        ],
        description:
          'Address is optional, but if provided, all fields except complement must be filled',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Id: Correlation ID or Tax ID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        description: 'Correlation ID or Tax ID of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['getCustomer'],
          },
        },
      },
      {
        displayName: 'Id: CorrelationID or RefundID',
        name: 'id',
        type: 'string',
        required: true,
        default: '',
        description: 'CorrelationID or RefundID of the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['getRefund'],
          },
        },
      },
      {
        displayName: 'value',
        name: 'value',
        type: 'number',
        required: true,
        default: '',
        placeholder: 'refund value into cents',
        description: 'Refund value into cents',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Transaction End To End ID',
        name: 'transactionEndToEndId',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'transaction end to end id',
        description:
          'Your transaction ID, or endToEnd ID, to keep track of this refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Correlation ID',
        name: 'correlationID',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'correlationID',
        description: 'Unique identifier for the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Refund comment',
        name: 'comment',
        type: 'string',
        default: '',
        placeholder: 'comment',
        description: 'Comment for the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 20,
        placeholder: '20',
        description: 'Number of items to return',
        displayOptions: {
          show: {
            resource: ['customer', 'refund', 'invoice'],
            operation: ['listCustomers', 'listRefunds', 'listInvoices'],
          },
        },
      },
      {
        displayName: 'Skip',
        name: 'skip',
        type: 'number',
        default: 0,
        placeholder: '0',
        description: 'Number of items to skip',
        displayOptions: {
          show: {
            resource: ['customer', 'refund', 'invoice'],
            operation: ['listCustomers', 'listRefunds', 'listInvoices'],
          },
        },
      },
      {
        displayName: 'Start Date',
        name: 'start',
        type: 'string',
        default: '',
        placeholder: '2021-01-01',
        description: 'Filter invoices by start date (format: YYYY-MM-DD)',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['listInvoices'],
          },
        },
      },
      {
        displayName: 'End Date',
        name: 'end',
        type: 'string',
        default: '',
        placeholder: '2021-01-01',
        description: 'Filter invoices by end date (format: YYYY-MM-DD)',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['listInvoices'],
          },
        },
      },
      {
        displayName: 'Correlation ID',
        name: 'correlationID',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'correlation-id-123',
        description: 'Unique identifier of the invoice',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: [
              'cancelInvoice',
              'getInvoicePdf',
              'getInvoiceXml',
              'createInvoice',
            ],
          },
        },
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        placeholder: 'Invoice description',
        description: 'Description of the invoice',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
      {
        displayName: 'Billing Date',
        name: 'billingDate',
        type: 'string',
        required: true,
        default: '',
        placeholder: '2024-01-15T10:00:00Z',
        description: 'Billing date in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
      {
        displayName: 'Charge ID',
        name: 'charge',
        type: 'string',
        default: '',
        placeholder: 'charge-id-123',
        description:
          'Charge ID (required if Value is not provided). One of Charge or Value must be provided.',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
      {
        displayName: 'Value',
        name: 'value',
        type: 'number',
        default: 0,
        placeholder: '1000',
        description:
          'Invoice value in cents (required if Charge ID is not provided). One of Charge or Value must be provided.',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'string',
        default: '',
        placeholder: 'customer-id-123',
        description:
          'Existing customer ID (required if Customer object is not provided). One of Customer ID or Customer must be provided.',
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
      {
        displayName: 'Customer',
        name: 'customer',
        type: 'collection',
        default: {
          taxID: '',
          name: '',
          email: '',
          phone: '',
          address: {
            country: '',
            zipcode: '',
            street: '',
            number: '',
            state: '',
          },
        },
        placeholder: 'Add Customer',
        description:
          'Customer object (required if Customer ID is not provided). All fields are required if provided.',
        options: [
          {
            displayName: 'Tax ID',
            name: 'taxID',
            type: 'string',
            default: '',
            placeholder: '12345678900',
            description: 'Customer tax ID (CPF/CNPJ)',
          },
          {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            default: '',
            placeholder: 'John Doe',
            description: 'Customer name',
          },
          {
            displayName: 'Email',
            name: 'email',
            type: 'string',
            default: '',
            placeholder: 'john@example.com',
            description: 'Customer email',
          },
          {
            displayName: 'Phone',
            name: 'phone',
            type: 'string',
            default: '',
            placeholder: '+5511999999999',
            description: 'Customer phone number',
          },
          {
            displayName: 'Address',
            name: 'address',
            type: 'collection',
            default: {
              country: '',
              zipcode: '',
              street: '',
              number: '',
              state: '',
            },
            placeholder: 'Add Address',
            description: 'Customer address (all fields required if provided)',
            options: [
              {
                displayName: 'Country',
                name: 'country',
                type: 'string',
                default: '',
                placeholder: 'BR',
                description: 'Country code',
              },
              {
                displayName: 'Zipcode',
                name: 'zipcode',
                type: 'string',
                default: '',
                placeholder: '01310-100',
                description: 'ZIP code',
              },
              {
                displayName: 'Street',
                name: 'street',
                type: 'string',
                default: '',
                placeholder: 'Avenida Paulista',
                description: 'Street name',
              },
              {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                placeholder: '1000',
                description: 'Street number',
              },
              {
                displayName: 'State',
                name: 'state',
                type: 'string',
                default: '',
                placeholder: 'SP',
                description: 'State code',
              },
            ],
          },
        ],
        displayOptions: {
          show: {
            resource: ['invoice'],
            operation: ['createInvoice'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const resource = this.getNodeParameter('resource', itemIndex) as string;
        const operation = this.getNodeParameter(
          'operation',
          itemIndex,
        ) as string;

        const handler = wooviOperations[resource]?.[operation];

        if (!handler) {
          throw new NodeApiError(this.getNode(), {
            message: `Unsupported resource/operation: ${resource}/${operation}`,
          });
        }

        const responseData = await handler.call(this, itemIndex);

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: itemIndex } },
        );

        returnData.push(...executionData);
      } catch (error) {
        if (error instanceof NodeApiError) {
          throw error;
        }

        const errObj =
          error && typeof error === 'object' && 'message' in (error as any)
            ? { message: (error as any).message }
            : { message: String(error) };

        throw new NodeApiError(this.getNode(), errObj);
      }
    }

    return [returnData];
  }
}
