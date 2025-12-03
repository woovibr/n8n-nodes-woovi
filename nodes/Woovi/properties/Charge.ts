import type { INodeProperties } from 'n8n-workflow';

export const chargeProperties: INodeProperties[] = [
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
    options: [
      { name: 'Create Charge', value: 'create' },
      { name: 'Get Charge', value: 'get' },
      { name: 'List Charges', value: 'list' },
      { name: 'List Refunds', value: 'listRefunds' },
      { name: 'Create Refund', value: 'createRefund' },
      { name: 'Update Expiration Date', value: 'updateChargeExpiration' },
      { name: 'Delete Charge', value: 'deleteCharge' },
      { name: 'Get QR Code Image', value: 'getQrImage' },
    ],
    default: 'create',
  },
  // Get Charge fields
  {
    displayName: 'Charge ID',
    name: 'chargeId',
    type: 'string',
    required: true,
    default: '',
    description: 'Charge ID or correlation ID',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: [
          'get',
          'listRefunds',
          'createRefund',
          'updateChargeExpiration',
          'deleteCharge',
          'getQrImage',
        ],
      },
    },
  },
  // List Charges fields
  {
    displayName: 'Start Date',
    name: 'start',
    type: 'string',
    default: '',
    placeholder: '2020-01-01T00:00:00Z',
    description: 'Start date used in the query (RFC 3339 format)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'End Date',
    name: 'end',
    type: 'string',
    default: '',
    placeholder: '2020-12-01T17:00:00Z',
    description: 'End date used in the query (RFC 3339 format)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'string',
    default: '',
    description: 'Charge status filter',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Customer Correlation ID',
    name: 'customer',
    type: 'string',
    default: '',
    description: 'Customer correlation ID to filter by',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Subscription Correlation ID',
    name: 'subscription',
    type: 'string',
    default: '',
    description: 'Subscription correlation ID to filter by',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
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
        resource: ['charge'],
        operation: ['list'],
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
        resource: ['charge'],
        operation: ['list'],
      },
    },
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
        operation: ['create'],
      },
    }, // Q2hhcmdlOjY5MmQ2ZTk0ZTc2NjUyMjVmMzcyYTJhZA==
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
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  // Create Refund fields
  {
    displayName: 'Refund Value',
    name: 'value',
    type: 'number',
    required: true,
    default: '',
    description: 'Refund value into cents',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  {
    displayName: 'Refund CorrelationID',
    name: 'correlationID',
    type: 'string',
    required: true,
    default: '',
    description: 'Unique identifier for the refund',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comment for the refund',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  // Update expiration date fields
  {
    displayName: 'ExpiresDate (ISO 8601)',
    name: 'expiresDate',
    type: 'string',
    default: '',
    placeholder: '2021-04-01T17:28:51.882Z',
    description: 'New expiration date in ISO 8601 format',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['updateChargeExpiration'],
      },
    },
  },
  // Get QR Code Image fields
  {
    displayName: 'Size',
    name: 'size',
    type: 'number',
    default: 150,
    placeholder: '150',
    description: 'Size of the image in pixels (optional)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['getQrImage'],
      },
    },
  },
];
