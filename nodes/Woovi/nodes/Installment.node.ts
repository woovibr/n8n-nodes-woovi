import type { INodeProperties } from 'n8n-workflow';

export const installmentProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['installment'],
      },
    },
    options: [
      { name: 'Get Installment', value: 'getInstallment' },
    ],
    default: 'getInstallment',
  },
  {
    displayName: 'Id: globalID or endToEndId',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'GI_123456789',
    description: 'GlobalID or endToEndId of the installment',
    displayOptions: {
      show: {
        resource: ['installment'],
        operation: ['getInstallment'],
      },
    },
  },
];
