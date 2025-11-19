import type { INodeProperties } from 'n8n-workflow';

export const invoiceProperties: INodeProperties[] = [
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
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    placeholder: '20',
    description: 'Number of items to return',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['listInvoices'],
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
        resource: ['invoice'],
        operation: ['listInvoices'],
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
];
