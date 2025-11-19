import type { INodeProperties } from 'n8n-workflow';

export const customerProperties: INodeProperties[] = [
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
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    placeholder: '20',
    description: 'Number of items to return',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['listCustomers'],
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
        resource: ['customer'],
        operation: ['listCustomers'],
      },
    },
  },
];
