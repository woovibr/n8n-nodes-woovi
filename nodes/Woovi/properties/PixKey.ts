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
        name: 'Set Pix Key as Default',
        value: 'setDefault',
        description: 'Set pix key as default',
        action: 'Set pix key as default',
      },
      {
        name: 'Delete Pix Key',
        value: 'delete',
        description: 'Delete a pix key',
        action: 'Delete a pix key',
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
    description: 'The pix key to check',
    displayOptions: {
      show: {
        resource: ['pixKey'],
        operation: ['check', 'setDefault', 'delete'],
      },
    },
  },
];
