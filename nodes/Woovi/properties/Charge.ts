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
    options: [{ name: 'Create Charge', value: 'create' }],
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
];
