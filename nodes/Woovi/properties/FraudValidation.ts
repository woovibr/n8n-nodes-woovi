import type { INodeProperties } from 'n8n-workflow';

export const fraudValidationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['fraudValidation'],
      },
    },
    options: [
      {
        name: 'Validate Tax ID',
        value: 'validateTaxId',
        description: 'Validate taxId fraud markers',
        action: 'Validate tax id',
      },
      {
        name: 'Validate Pix Key',
        value: 'validatePixKey',
        description: 'Validate pix key fraud markers',
        action: 'Validate pix key',
      },
    ],
    default: 'validateTaxId',
  },
  {
    displayName: 'Tax ID',
    name: 'taxId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['fraudValidation'],
        operation: ['validateTaxId'],
      },
    },
    description: 'The tax ID to validate',
  },
  {
    displayName: 'Pix Key',
    name: 'pixKey',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['fraudValidation'],
        operation: ['validatePixKey'],
      },
    },
    description: 'The pix key to validate',
  },
];
