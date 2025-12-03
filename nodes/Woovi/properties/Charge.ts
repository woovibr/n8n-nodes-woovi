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
      { name: 'Create Refund', value: 'createRefund' },
      { name: 'Update Expiration Date', value: 'updateChargeExpiration' },
      { name: 'Delete Charge', value: 'deleteCharge' },
    ],
    default: 'create',
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
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  // Create Refund fields
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
        operation: ['createRefund', 'updateChargeExpiration', 'deleteCharge'],
      },
    },
  },
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
    name: 'correlationIDRefund',
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
];
