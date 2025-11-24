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
    options: [{ name: 'Create Payment Request', value: 'create' }],
    default: 'create',
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
        operation: ['create'],
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
        operation: ['create'],
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
      },
    },
  },
  {
    displayName: 'Metadata (JSON)',
    name: 'metadata',
    type: 'string',
    default: '',
    description:
      'Optional metadata as a JSON object (max 30 keys). Example: {"orderId":"123"}',
    displayOptions: {
      show: {
        resource: ['payment'],
        operation: ['create'],
      },
    },
  },
];
