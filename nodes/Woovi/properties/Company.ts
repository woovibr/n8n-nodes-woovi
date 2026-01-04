import type { INodeProperties } from 'n8n-workflow';

export const companyProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['company'] } },
    options: [{ name: 'Get Company', value: 'get' }],
    default: 'get',
  },
];
