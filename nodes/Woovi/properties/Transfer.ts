import type { INodeProperties } from 'n8n-workflow';

export const transferProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['transfer'] } },
    options: [{ name: 'Create Transfer', value: 'create' }],
    default: 'create',
  },
  {
    displayName: 'Value (in cents)',
    name: 'value',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: { show: { resource: ['transfer'], operation: ['create'] } },
  },
  {
    displayName: 'From Pix Key',
    name: 'fromPixKey',
    type: 'string',
    default: '',
    displayOptions: { show: { resource: ['transfer'], operation: ['create'] } },
  },
  {
    displayName: 'To Pix Key',
    name: 'toPixKey',
    type: 'string',
    default: '',
    displayOptions: { show: { resource: ['transfer'], operation: ['create'] } },
  },
  {
    displayName: 'Correlation ID',
    name: 'correlationID',
    type: 'string',
    default: '',
    description: 'Your correlation ID to keep track of this transfer',
    displayOptions: { show: { resource: ['transfer'], operation: ['create'] } },
  },
];
