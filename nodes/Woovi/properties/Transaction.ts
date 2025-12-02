import type { INodeProperties } from 'n8n-workflow';

export const transactionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['transaction'],
      },
    },
    options: [
      { name: 'List Transactions', value: 'list' },
      { name: 'Get Transaction', value: 'get' },
    ],
    default: 'list',
  },
  {
    displayName: 'Transaction ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    description: 'Transaction ID or endToEndId',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Start Date',
    name: 'start',
    type: 'string',
    default: '',
    placeholder: '2020-01-01T00:00:00Z',
    description:
      'Start date used in the query (RFC 3339 format, e.g. 2020-01-01T00:00:00Z)',
    displayOptions: {
      show: {
        resource: ['transaction'],
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
    description:
      'End date used in the query (RFC 3339 format, e.g. 2020-12-01T17:00:00Z)',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Charge',
    name: 'charge',
    type: 'string',
    default: '',
    description:
      'Charge ID, correlation ID or transaction ID to get transactions related to this charge',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Pix QR Code',
    name: 'pixQrCode',
    type: 'string',
    default: '',
    description:
      'QrCode static ID, correlation ID or identifier field to get transactions related to this QR code',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Withdrawal',
    name: 'withdrawal',
    type: 'string',
    default: '',
    description:
      'Withdrawal ID or EndToEndId to get all transactions related to the withdrawal',
    displayOptions: {
      show: {
        resource: ['transaction'],
        operation: ['list'],
      },
    },
  },
];
