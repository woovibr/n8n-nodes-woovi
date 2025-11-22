import type { INodeProperties } from 'n8n-workflow';

export const pixKeyProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['pixKey'],
      },
    },
    options: [
      {
        name: 'Check Pix Key',
        value: 'check',
        description: 'Check public data of a pix key',
        action: 'Check a pix key',
      },
      {
        name: 'Create Pix Key',
        value: 'create',
        description: 'Create a new pix key',
        action: 'Create a pix key',
      },
      {
        name: 'Delete Pix Key',
        value: 'delete',
        description: 'Delete a pix key',
        action: 'Delete a pix key',
      },
      {
        name: 'Get Pix Key Tokens',
        value: 'getTokens',
        description: 'Get tokens data for pix keys',
        action: 'Get pix key tokens',
      },
      {
        name: 'List Pix Keys',
        value: 'list',
        description: 'List all pix keys',
        action: 'List pix keys',
      },
      {
        name: 'Set Pix Key as Default',
        value: 'setDefault',
        description: 'Set pix key as default',
        action: 'Set pix key as default',
      },
    ],
    default: 'check',
  },
  {
    displayName: 'Pix Key',
    name: 'pixKey',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'Pix Key',
    description: 'The pix key value',
    displayOptions: {
      show: {
        resource: ['pixKey'],
        operation: ['check', 'setDefault', 'delete'],
      },
    },
  },
  {
    displayName: 'Pix Key',
    name: 'pixKey',
    type: 'string',
    default: '',
    placeholder: 'Leave empty for EVP type',
    description: 'The pix key value (required for CNPJ, optional for EVP)',
    displayOptions: {
      show: {
        resource: ['pixKey'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Pix Key Type',
    name: 'pixKeyType',
    type: 'options',
    options: [
      {
        name: 'CNPJ',
        value: 'CNPJ',
      },
      {
        name: 'EVP',
        value: 'EVP',
      },
    ],
    default: 'CNPJ',
    description: 'Type of the pix key',
    displayOptions: {
      show: {
        resource: ['pixKey'],
        operation: ['create'],
      },
    },
  },
];
