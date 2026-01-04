import type { INodeProperties } from 'n8n-workflow';

export const decodeProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['decode'] } },
    options: [{ name: 'Parse EMV (PIX)', value: 'emv' }],
    default: 'emv',
  },
  {
    displayName: 'EMV',
    name: 'emv',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: { resource: ['decode'], operation: ['emv'] } },
  },
];
