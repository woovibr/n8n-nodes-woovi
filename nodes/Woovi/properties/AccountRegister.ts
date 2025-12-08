import type { INodeProperties } from 'n8n-workflow';

export const accountRegisterProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['accountRegister'] } },
    options: [
      { name: 'Create Account Register', value: 'create' },
      { name: 'Get Account Register By Tax ID', value: 'getByTaxId' },
      { name: 'Update Account Register', value: 'update' },
      { name: 'Delete Account Register', value: 'delete' },
    ],
    default: 'create',
  },
  {
    displayName: 'Official Name',
    name: 'officialName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
  },
  {
    displayName: 'Trade Name',
    name: 'tradeName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
  },
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['accountRegister'],
        operation: ['create', 'getByTaxId', 'update', 'delete'],
      },
    },
  },
  {
    displayName: 'Billing Address',
    name: 'billingAddress',
    type: 'collection',
    default: {},
    required: true,
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
    options: [
      { displayName: 'Zipcode', name: 'zipcode', type: 'string', default: '' },
      { displayName: 'Street', name: 'street', type: 'string', default: '' },
      { displayName: 'Number', name: 'number', type: 'string', default: '' },
      {
        displayName: 'Neighborhood',
        name: 'neighborhood',
        type: 'string',
        default: '',
      },
      { displayName: 'City', name: 'city', type: 'string', default: '' },
      { displayName: 'State', name: 'state', type: 'string', default: '' },
    ],
  },
  {
    displayName: 'Documents',
    name: 'documents',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    default: [],
    placeholder: 'Add Document',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
    options: [
      {
        displayName: 'Document',
        name: 'document',
        values: [
          { displayName: 'URL', name: 'url', type: 'string', default: '' },
          {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            default: 'SOCIAL_CONTRACT',
            options: [
              { name: 'SOCIAL_CONTRACT', value: 'SOCIAL_CONTRACT' },
              { name: 'ATA', value: 'ATA' },
              { name: 'BYLAWS', value: 'BYLAWS' },
            ],
          },
        ],
      },
    ],
  },
  {
    displayName: 'Representatives',
    name: 'representatives',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    default: [],
    placeholder: 'Add Representative',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
    options: [
      {
        displayName: 'Representative',
        name: 'representative',
        values: [
          { displayName: 'Name', name: 'name', type: 'string', default: '' },
          {
            displayName: 'Birth Date',
            name: 'birthDate',
            type: 'string',
            default: '',
          },
          { displayName: 'Email', name: 'email', type: 'string', default: '' },
          { displayName: 'Tax ID', name: 'taxID', type: 'string', default: '' },
          {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            default: 'ADMIN',
            options: [{ name: 'ADMIN', value: 'ADMIN' }],
          },
        ],
      },
    ],
  },
  {
    displayName: 'Business Description',
    name: 'businessDescription',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Business Product',
    name: 'businessProduct',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Business Lifetime',
    name: 'businessLifetime',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Business Goal',
    name: 'businessGoal',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    default: {},
    placeholder: 'Add Field',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['update'] },
    },
    options: [
      {
        displayName: 'Business Description',
        name: 'businessDescription',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Business Product',
        name: 'businessProduct',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Business Lifetime',
        name: 'businessLifetime',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Business Goal',
        name: 'businessGoal',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Billing Address',
        name: 'billingAddress',
        type: 'collection',
        default: {},
        options: [
          {
            displayName: 'Zipcode',
            name: 'zipcode',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Number',
            name: 'number',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Neighborhood',
            name: 'neighborhood',
            type: 'string',
            default: '',
          },
          { displayName: 'City', name: 'city', type: 'string', default: '' },
          { displayName: 'State', name: 'state', type: 'string', default: '' },
        ],
      },
      {
        displayName: 'Documents',
        name: 'documents',
        type: 'fixedCollection',
        typeOptions: { multipleValues: true },
        default: [],
        placeholder: 'Add Document',
        options: [
          {
            displayName: 'Document',
            name: 'document',
            values: [
              { displayName: 'URL', name: 'url', type: 'string', default: '' },
              {
                displayName: 'Type',
                name: 'type',
                type: 'string',
                default: '',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Representatives',
        name: 'representatives',
        type: 'fixedCollection',
        typeOptions: { multipleValues: true },
        default: [],
        placeholder: 'Add Representative',
        options: [
          {
            displayName: 'Representative',
            name: 'representative',
            values: [
              {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Tax ID',
                name: 'taxID',
                type: 'string',
                default: '',
              },
              {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default accountRegisterProperties;
