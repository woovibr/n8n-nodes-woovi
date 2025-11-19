import type { INodeProperties } from 'n8n-workflow';

export const subscriptionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['subscription'],
      },
    },
    options: [
      { name: 'List Subscriptions', value: 'listSubscriptions' },
      { name: 'Get Subscription', value: 'getSubscription' },
      { name: 'Create Subscription', value: 'createSubscription' },
      { name: 'Cancel Subscription', value: 'cancelSubscription' },
      { name: 'Update Subscription Value', value: 'updateSubscriptionValue' },
      {
        name: 'List Subscription Installments',
        value: 'listSubscriptionInstallments',
      },
    ],
    default: 'listSubscriptions',
  },
  {
    displayName: 'Subscription ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'subscription_id_123',
    description: 'ID of the subscription',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: [
          'getSubscription',
          'cancelSubscription',
          'updateSubscriptionValue',
          'listSubscriptionInstallments',
        ],
      },
    },
  },
  // Update Subscription Value field
  {
    displayName: 'New Value (cents)',
    name: 'value',
    type: 'number',
    required: true,
    default: 0,
    placeholder: '10000',
    description:
      'New value in cents for future subscription installments. Note: Only works if PIX automatic accepts dynamic value',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['updateSubscriptionValue'],
      },
    },
  },
  // Create Subscription fields
  {
    displayName: 'Value (cents)',
    name: 'value',
    type: 'number',
    required: true,
    default: 0,
    placeholder: '10000',
    description: 'Value in cents of this subscription',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    options: [
      { name: 'PIX Recurring', value: 'PIX_RECURRING' },
      { name: 'Recurrent', value: 'RECURRENT' },
    ],
    default: 'PIX_RECURRING',
    description: 'Type of the subscription',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Correlation ID',
    name: 'correlationID',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'sub-correlationID-123',
    description: 'Your correlation ID to keep track of this subscription',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Customer Name',
    name: 'customerName',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'John Doe',
    description: 'Customer name',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Customer Email',
    name: 'customerEmail',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'john@example.com',
    description: 'Customer email',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Customer Phone',
    name: 'customerPhone',
    type: 'string',
    required: true,
    default: '',
    placeholder: '+5511999999999',
    description: 'Customer phone',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Customer Tax ID',
    name: 'customerTaxID',
    type: 'string',
    required: true,
    default: '',
    placeholder: '12345678900',
    description: 'Customer taxID (CPF or CNPJ)',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Customer Address',
    name: 'customerAddress',
    type: 'collection',
    required: true,
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
    description: 'Customer address (all fields except complement are required)',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Subscription Name',
    name: 'name',
    type: 'string',
    default: '',
    placeholder: 'Monthly subscription',
    description: 'Name of the subscription (optional)',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    placeholder: 'Comment to show in QR Code',
    description: 'Comment to be shown in QR Code (optional)',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Day Generate Charge',
    name: 'dayGenerateCharge',
    type: 'number',
    default: 5,
    placeholder: '5',
    description:
      'Day of the month that the charges will be generated (1-31). Default: 5',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Pix Automatic Options',
    name: 'pixRecurringOptions',
    type: 'collection',
    required: true,
    default: {
      retryPolicy: 'NON_PERMITED',
      journey: 'PAYMENT_ON_APPROVAL',
      minimumValue: 0,
    },
    description: 'Pix automatic options',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
    options: [
      {
        displayName: 'Retry Policy',
        name: 'retryPolicy',
        type: 'options',
        options: [
          { name: 'NON_PERMITED', value: 'NON_PERMITED' },
          { name: 'THREE_RETRIES_7_DAYS', value: 'THREE_RETRIES_7_DAYS' },
        ],
        default: 'NON_PERMITED',
        description: 'Retry policy for pix automatic',
      },
      {
        displayName: 'Journey',
        name: 'journey',
        type: 'options',
        options: [
          { name: 'PAYMENT_ON_APPROVAL', value: 'PAYMENT_ON_APPROVAL' },
          { name: 'ONLY_RECURRENCY', value: 'ONLY_RECURRENCY' },
        ],
        default: 'PAYMENT_ON_APPROVAL',
        description: 'Journey type of the pix automatic',
      },
      {
        displayName: 'Minimum Value (cents)',
        name: 'minimumValue',
        type: 'number',
        default: 0,
        required: true,
        description: 'Minimum value for each cobr (in cents)',
      },
    ],
  },
  {
    displayName: 'Frequency',
    name: 'frequency',
    type: 'options',
    options: [
      { name: 'Weekly', value: 'WEEKLY' },
      { name: 'Monthly', value: 'MONTHLY' },
      { name: 'Semiannually', value: 'SEMIANNUALLY' },
      { name: 'Annually', value: 'ANNUALLY' },
    ],
    default: '',
    description: 'Frequency of the subscription (optional)',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
      },
    },
  },
  {
    displayName: 'Day Due',
    name: 'dayDue',
    type: 'number',
    default: 7,
    placeholder: '7',
    description:
      'Days that the charge will take to expire from the generation day (minimum 3). Default: 7',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['createSubscription'],
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
        resource: ['subscription'],
        operation: ['listSubscriptions'],
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
        resource: ['subscription'],
        operation: ['listSubscriptions'],
      },
    },
  },
];
