import type { INodeProperties } from 'n8n-workflow';

export const paymentProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['payment'],
      },
    },
    options: [
      { name: 'List Payments', value: 'list' },
      { name: 'Get Payment', value: 'get' },
      { name: 'Create Payment Request', value: 'create' },
      { name: 'Approve Payment Request', value: 'approve' },
    ],
    default: 'create',
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
        resource: ['payment'],
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
        resource: ['payment'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Payment ID',
    name: 'id',
    type: 'string',
    default: '',
    description: 'Payment ID or correlation ID',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Type',
    name: 'paymentType',
    type: 'options',
    required: true,
    options: [
      { name: 'PIX Key', value: 'PIX_KEY' },
      { name: 'QR Code', value: 'QR_CODE' },
      { name: 'Manual', value: 'MANUAL' },
    ],
    default: 'PIX_KEY',
    description: 'Type of the payment request',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Value (cents)',
    name: 'value',
    type: 'number',
    required: true,
    default: 0,
    description: 'Value of the requested payment in cents',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['PIX_KEY', 'MANUAL'],
      },
    },
  },
  {
    displayName: 'Correlation ID',
    name: 'correlationID',
    type: 'string',
    required: true,
    default: '',
    description: 'Unique identifier for this payment request',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create', 'approve'],
      },
    },
  },
  {
    displayName: 'pixKeyEndToEndId',
    name: 'pixKeyEndToEndId',
    type: 'string',
    default: '',
    description: 'End-to-end id of the pix key used for tracking',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create', 'approve'],
      },
    },
  },
  {
    displayName: 'QR Code',
    name: 'qrCode',
    type: 'string',
    default: '',
    description: 'QR Code to be paid (required for QR_CODE type)',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['QR_CODE'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comment sent alongside your payment',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Destination Alias',
    name: 'destinationAlias',
    type: 'string',
    default: '',
    description: 'The pix key or alias to receive the payment',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['PIX_KEY'],
      },
    },
  },
  {
    displayName: 'Destination Alias Type',
    name: 'destinationAliasType',
    type: 'options',
    default: '',
    options: [
      { name: 'CPF', value: 'CPF' },
      { name: 'CNPJ', value: 'CNPJ' },
      { name: 'EMAIL', value: 'EMAIL' },
      { name: 'PHONE', value: 'PHONE' },
      { name: 'RANDOM', value: 'RANDOM' },
    ],
    description: 'Type of the destination pix key',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['PIX_KEY'],
      },
    },
  },
  {
    displayName: 'PSP',
    name: 'psp',
    type: 'string',
    default: '',
    description: 'PSP identifier (required for MANUAL type)',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['MANUAL'],
      },
    },
  },
  {
    displayName: 'Holder',
    name: 'holder',
    type: 'collection',
    placeholder: 'Add holder data',
    default: {},
    description: 'Holder information for manual payments',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['MANUAL'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Tax ID',
        name: 'taxID',
        type: 'string',
        default: '',
      },
    ],
  },
  {
    displayName: 'Account',
    name: 'account',
    type: 'collection',
    placeholder: 'Add account data',
    default: {},
    description: 'Account information for manual payments',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
        paymentType: ['MANUAL'],
      },
    },
    options: [
      {
        displayName: 'Bank',
        name: 'bank',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Branch',
        name: 'branch',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Account',
        name: 'accountNumber',
        type: 'string',
        default: '',
      },
    ],
  },
  {
    displayName: 'Metadata',
    name: 'metadata',
    type: 'fixedCollection',
    placeholder: 'Add Metadata',
    default: {},
    typeOptions: {
      multipleValues: true,
    },
    description:
      'Optional metadata as key/value pairs (max 30 keys). Use multiple entries to add many metadata items.',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Metadata Item',
        name: 'metadataItem',
        values: [
          {
            displayName: 'Key',
            name: 'key',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
          },
        ],
      },
    ],
  },
];
