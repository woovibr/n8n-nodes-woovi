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
      { name: 'Create CobR Manually', value: 'createInstallmentCobr' },
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
        operation: ['getInstallment', 'createInstallmentCobr'],
      },
    },
  },
  {
    displayName: 'Value (cents)',
    name: 'value',
    type: 'number',
    default: 0,
    placeholder: '10000',
    description: 'Optional value in cents for the CobR. If not provided or 0, uses the installment value',
    displayOptions: {
      show: {
        resource: ['installment'],
        operation: ['createInstallmentCobr'],
      },
    },
  },
];
