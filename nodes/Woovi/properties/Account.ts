import type { INodeProperties } from 'n8n-workflow';

export const accountProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['account'] } },
    options: [
      { name: 'Create Account', value: 'create' },
      { name: 'Get Account', value: 'get' },
      { name: 'List Accounts', value: 'list' },
      { name: 'Withdraw', value: 'withdraw' },
    ],
    default: 'create',
  },
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { resource: ['account'], operation: ['withdraw', 'get'] },
    },
  },
  {
    displayName: 'Value (in cents)',
    name: 'value',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: { resource: ['account'], operation: ['withdraw'] },
    },
  },
];
