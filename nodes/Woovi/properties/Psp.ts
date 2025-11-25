import type { INodeProperties } from 'n8n-workflow';

export const pspProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['psp'],
      },
    },
    options: [{ name: 'List PSPs', value: 'list' }],
    default: 'list',
  },
  {
    displayName: 'ISPB',
    name: 'ispb',
    type: 'string',
    default: '',
    description: 'Filter PSPs by ISPB code',
    displayOptions: {
      show: {
        resource: ['psp'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    description: 'Filter PSPs by name',
    displayOptions: {
      show: {
        resource: ['psp'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'COMPE',
    name: 'compe',
    type: 'string',
    default: '',
    description: 'Filter PSPs by COMPE code',
    displayOptions: {
      show: {
        resource: ['psp'],
        operation: ['list'],
      },
    },
  },
];
