import type { INodeProperties } from 'n8n-workflow';

export const refundProperties: INodeProperties[] = [
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
        resource: ['refund'],
        operation: ['listRefunds'],
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
        resource: ['refund'],
        operation: ['listRefunds'],
      },
    },
  },
];
