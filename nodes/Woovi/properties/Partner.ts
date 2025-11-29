import type { INodeProperties } from 'n8n-workflow';

export const partnerProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['partner'],
      },
    },
    options: [
      {
        name: 'Create Company (Pre-registration)',
        value: 'createCompany',
        description: 'Create a new pre-registration referencing your company as a partner',
        action: 'Create a company pre registration',
      },
      {
        name: 'Create Application',
        value: 'createApplication',
        description: 'Create a new application to some of your companies',
        action: 'Create a new application',
      },
    ],
    default: 'createCompany',
  },
  /* -------------------------------------------------------------------------- */
  /*                                partner:createCompany                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: "The name of this preregistration. It'll be related as your company name too.",
  },
  {
    displayName: 'Website',
    name: 'website',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    description: 'A website that is related to this preregistration',
  },
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'collection',
    placeholder: 'Add Tax ID',
    default: {},
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    options: [
      {
        displayName: 'Tax ID',
        name: 'taxID',
        type: 'string',
        default: '',
        description: 'The tax identifier of your account holder. This should be a raw string with only digits.',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          {
            name: 'CNPJ',
            value: 'BR:CNPJ',
          },
          {
            name: 'CPF',
            value: 'BR:CPF',
          },
        ],
        default: 'BR:CNPJ',
        description: 'Type of the tax ID',
      },
    ],
    required: true,
  },
  {
    displayName: 'User',
    name: 'user',
    type: 'collection',
    placeholder: 'Add User',
    default: {},
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    options: [
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: "The user's first name",
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: "The user's last name",
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: "The user's email",
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: "The user's phone number (E.164 format)",
      },
      {
        displayName: 'Tax ID',
        name: 'taxID',
        type: 'collection',
        placeholder: 'Add User Tax ID',
        default: {},
        options: [
          {
            displayName: 'Tax ID',
            name: 'taxID',
            type: 'string',
            default: '',
            description: 'The tax identifier of the user',
          },
          {
            displayName: 'Type',
            name: 'type',
            type: 'options',
            options: [
              {
                name: 'CNPJ',
                value: 'BR:CNPJ',
              },
              {
                name: 'CPF',
                value: 'BR:CPF',
              },
            ],
            default: 'BR:CPF',
            description: 'Type of the tax ID',
          },
        ],
      },
    ],
    required: true,
  },

  /* -------------------------------------------------------------------------- */
  /*                                partner:createApplication                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createApplication'],
      },
    },
    required: true,
    description: 'The name you want to give your application',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    options: [
      {
        name: 'API',
        value: 'API',
      },
      {
        name: 'Plugin',
        value: 'PLUGIN',
      },
      {
        name: 'Oracle',
        value: 'ORACLE',
      },
    ],
    default: 'API',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createApplication'],
      },
    },
    required: true,
    description: 'Type of the application that you want to register',
  },
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'collection',
    placeholder: 'Add Tax ID',
    default: {},
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createApplication'],
      },
    },
    options: [
      {
        displayName: 'Tax ID',
        name: 'taxID',
        type: 'string',
        default: '',
        description: 'The tax identifier of your account holder. This should be a raw string with only digits.',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          {
            name: 'CNPJ',
            value: 'BR:CNPJ',
          },
          {
            name: 'CPF',
            value: 'BR:CPF',
          },
        ],
        default: 'BR:CNPJ',
        description: 'Type of the tax ID',
      },
    ],
    required: true,
  },
];
