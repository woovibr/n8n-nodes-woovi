import type { INodeProperties } from 'n8n-workflow';

export const subaccountProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['subaccount'],
      },
    },
    options: [
      { name: 'List Subaccounts', value: 'listSubaccounts' },
      { name: 'Get Subaccount', value: 'getSubaccount' },
      { name: 'Create/Retrieve Subaccount', value: 'createSubaccount' },
      { name: 'Withdraw from Subaccount', value: 'withdrawSubaccount' },
      { name: 'Debit Subaccount', value: 'debitSubaccount' },
      { name: 'Delete Subaccount', value: 'deleteSubaccount' },
      {
        name: 'Transfer between Subaccounts',
        value: 'transferSubaccounts',
      },
    ],
    default: 'listSubaccounts',
  },
  {
    displayName: 'CorrelationID',
    name: 'correlationID',
    type: 'string',
    default: '',
    placeholder: 'correlationID',
    description: 'Unique identifier for the subaccount operation',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['transferSubaccounts'],
      },
    },
  },
  {
    displayName: 'Subaccount ID',
    name: 'subaccountId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'subaccount id',
    description: 'Subaccount id (used by get/withdraw/debit/delete)',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: [
          'getSubaccount',
          'withdrawSubaccount',
          'debitSubaccount',
          'deleteSubaccount',
        ],
      },
    },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    default: 0,
    description: 'Amount in cents for withdraw/debit/transfer',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: [
          'withdrawSubaccount',
          'debitSubaccount',
          'transferSubaccounts',
        ],
      },
    },
  },
  {
    displayName: 'Pix Key',
    name: 'subaccountPixKey',
    type: 'string',
    required: true,
    default: '',
    description: 'Pix key for create/retrieve subaccount',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['createSubaccount'],
      },
    },
  },
  {
    displayName: 'Subaccount Name',
    name: 'subaccountName',
    type: 'string',
    default: '',
    description: 'Friendly name for the subaccount',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['createSubaccount'],
      },
    },
  },
  {
    displayName: 'To Pix Key',
    name: 'toPixKey',
    type: 'string',
    required: true,
    default: '',
    description: 'Destination pix key for transfer',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['transferSubaccounts'],
      },
    },
  },
  {
    displayName: 'From Pix Key',
    name: 'fromPixKey',
    type: 'string',
    required: true,
    default: '',
    description: 'Source pix key for transfer',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['transferSubaccounts'],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'operationDescription',
    type: 'string',
    default: '',
    description: 'Description for debit or transfer',
    displayOptions: {
      show: {
        resource: ['subaccount'],
        operation: ['debitSubaccount', 'transferSubaccounts'],
      },
    },
  },
];
