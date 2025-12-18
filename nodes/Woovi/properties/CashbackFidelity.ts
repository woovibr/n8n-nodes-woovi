import type { INodeProperties } from 'n8n-workflow';

export const cashbackFidelityProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    default: 'getByTaxId',
    displayOptions: { show: { resource: ['cashbackFidelity'] } },
    options: [
      {
        name: 'Get cashback balance by Tax ID',
        value: 'getByTaxId',
        description: "Get cashback balance for customer's tax ID",
      },
      {
        name: 'Create or Get Cashback by Tax ID',
        value: 'create',
        description:
          'Create or get an exclusive cashback for a customer (taxID + value)',
      },
    ],
  },
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['cashbackFidelity'],
        operation: ['getByTaxId', 'create'],
      },
    },
    required: true,
    description: "Customer's Tax ID (CPF/CNPJ) without formatting",
  },
  {
    displayName: 'Value (cents)',
    name: 'value',
    type: 'number',
    default: 0,
    displayOptions: {
      show: { resource: ['cashbackFidelity'], operation: ['create'] },
    },
    required: true,
    description: 'Cashback value in centavos (integer)',
  },
];

export default cashbackFidelityProperties;
