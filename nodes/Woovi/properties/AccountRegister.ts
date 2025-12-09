import type { INodeProperties } from 'n8n-workflow';

export const accountRegisterProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    default: 'create',
    displayOptions: { show: { resource: ['accountRegister'] } },
    options: [
      { name: 'Create Account Register', value: 'create' },
      { name: 'Get Account Register By Tax ID', value: 'getByTaxId' },
      { name: 'Update Account Register', value: 'update' },
      { name: 'Delete Account Register', value: 'delete' },
    ],
  },

  // BASIC DATA (CREATE)
  {
    displayName: 'Official Name',
    name: 'officialName',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
  },
  {
    displayName: 'Trade Name',
    name: 'tradeName',
    type: 'string',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
  },
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'string',
    default: '',
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
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create'] },
    },
    options: [
      {
        displayName: 'Zipcode',
        name: 'zipcode',
        type: 'string',
        placeholder: '00000000',
        default: '',
      },
      {
        displayName: 'Street',
        name: 'street',
        type: 'string',
        placeholder: 'Street',
        default: '',
      },
      {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        placeholder: 'Number',
        default: '',
      },
      {
        displayName: 'Neighborhood',
        name: 'neighborhood',
        type: 'string',
        placeholder: 'Neighborhood',
        default: '',
      },
      {
        displayName: 'City',
        name: 'city',
        type: 'string',
        placeholder: 'City',
        default: '',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'string',
        placeholder: 'State',
        default: '',
      },
    ],
  },

  {
    displayName: 'Documents',
    name: 'documents',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    default: {},
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
    default: {},
    placeholder: 'Add Representative',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
    options: [
      {
        displayName: 'Representative',
        name: 'representative',
        values: [
          {
            displayName: 'Name',
            name: 'name',
            type: 'string',
            placeholder: 'Full Name',
            default: '',
          },
          {
            displayName: 'Birth Date',
            name: 'birthDate',
            placeholder: 'YYYY-MM-DD',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Email',
            name: 'email',
            type: 'string',
            default: '',
            placeholder: 'email@gmail.com',
          },
          {
            displayName: 'Tax ID',
            name: 'taxID',
            type: 'string',
            default: '',
            placeholder: '00.000.000/0000-00',
          },
          {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            default: 'ADMIN',
            options: [{ name: 'ADMIN', value: 'ADMIN' }],
          },
          {
            displayName: 'Phone',
            name: 'phone',
            type: 'string',
            placeholder: '0000000000',
            default: '',
            description: 'Phone number',
          },
          {
            displayName: 'Documents',
            name: 'documents',
            type: 'fixedCollection',
            typeOptions: { multipleValues: true },
            default: {},
            placeholder: 'Add Document',
            description: 'Documents (CNH_FRONT, CNH_BACK, PICTURE)',
            options: [
              {
                displayName: 'Document',
                name: 'document',
                values: [
                  {
                    displayName: 'URL',
                    name: 'url',
                    type: 'string',
                    placeholder: 'https://example.com/document.jpg',
                    default: '',
                  },
                  {
                    displayName: 'Type',
                    name: 'type',
                    type: 'options',
                    default: 'CNH_FRONT',
                    options: [
                      { name: 'IDENTITY_FRONT', value: 'IDENTITY_FRONT' },
                      { name: 'IDENTITY_BACK', value: 'IDENTITY_BACK' },
                      { name: 'CNH', value: 'CNH' },
                      { name: 'CNH_FRONT', value: 'CNH_FRONT' },
                      { name: 'CNH_BACK', value: 'CNH_BACK' },
                      { name: 'PICTURE', value: 'PICTURE' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            displayName: 'Address',
            name: 'address',
            type: 'collection',
            default: {
              zipcode: '',
              street: '',
              number: '',
              neighborhood: '',
              city: '',
              state: '',
            },
            options: [
              {
                displayName: 'Zipcode',
                name: 'zipcode',
                type: 'string',
                default: '',
                placeholder: '00000000',
              },
              {
                displayName: 'Street',
                name: 'street',
                type: 'string',
                default: '',
                placeholder: 'Street Name',
              },
              {
                displayName: 'Number',
                name: 'number',
                type: 'string',
                default: '',
                placeholder: '123',
              },
              {
                displayName: 'Neighborhood',
                name: 'neighborhood',
                type: 'string',
                default: '',
                placeholder: 'Neighborhood Name',
              },
              {
                displayName: 'City',
                name: 'city',
                type: 'string',
                default: '',
                placeholder: 'City Name',
              },
              {
                displayName: 'State',
                name: 'state',
                type: 'string',
                default: '',
                placeholder: 'State Name',
              },
            ],
          },
        ],
      },
    ],
  },

  // BUSINESS FIELDS (CREATE & UPDATE)
  {
    displayName: 'Business Description',
    name: 'businessDescription',
    type: 'string',
    placeholder: 'Description of the business activity',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Business Product',
    name: 'businessProduct',
    type: 'string',
    placeholder: 'Description of the business product',
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
    placeholder: 'Description of the business lifetime',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
  {
    displayName: 'Business Goal',
    name: 'businessGoal',
    type: 'string',
    placeholder: 'Description of the business goal with Woovi',
    default: '',
    displayOptions: {
      show: { resource: ['accountRegister'], operation: ['create', 'update'] },
    },
  },
];

export default accountRegisterProperties;
