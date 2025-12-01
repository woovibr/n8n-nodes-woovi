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
        description:
          'Create a new pre-registration referencing your company as a partner',
        action: 'Create a company pre registration',
      },
      {
        name: 'Create Application',
        value: 'createApplication',
        description: 'Create a new application to some of your companies',
        action: 'Create a new application',
      },
      {
        name: 'Get Company (Pre-registration)',
        value: 'getCompany',
        description: 'Get a pre-registration by taxID',
        action: 'Get a company pre registration',
      },
      {
        name: 'List Companies (Pre-registrations)',
        value: 'listCompanies',
        description: 'List pre-registrations managed by the partner',
        action: 'List company pre registrations',
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
    placeholder: 'Example LLC',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description:
      "The name of this preregistration. It'll be related as your company name too.",
  },
  {
    displayName: 'Website',
    name: 'website',
    type: 'string',
    default: '',
    placeholder: 'https://examplellc.com',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    description: 'A website that is related to this preregistration',
  },
  {
    displayName: 'Company Tax ID',
    name: 'companyTaxID',
    type: 'string',
    default: '',
    placeholder: '65914571000187',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description:
      'The tax identifier of your account holder. This should be a raw string with only digits.',
  },
  {
    displayName: 'Company Tax ID Type',
    name: 'companyTaxIDType',
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
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: 'Type of the tax ID',
  },
  {
    displayName: 'User First Name',
    name: 'userFirstName',
    type: 'string',
    default: '',
    placeholder: 'John',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: "The user's first name",
  },
  {
    displayName: 'User Last Name',
    name: 'userLastName',
    type: 'string',
    default: '',
    placeholder: 'Doe',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: "The user's last name",
  },
  {
    displayName: 'User Email',
    name: 'userEmail',
    type: 'string',
    default: '',
    placeholder: 'johndoe@examplellc.com',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: "The user's email",
  },
  {
    displayName: 'User Phone',
    name: 'userPhone',
    type: 'string',
    default: '',
    placeholder: '+5511912345678',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: "The user's phone number (E.164 format)",
  },
  {
    displayName: 'User Tax ID',
    name: 'userTaxID',
    type: 'string',
    default: '',
    placeholder: '98765432100',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: 'The tax identifier of the user',
  },
  {
    displayName: 'User Tax ID Type',
    name: 'userTaxIDType',
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
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createCompany'],
      },
    },
    required: true,
    description: 'Type of the tax ID',
  },

  /* -------------------------------------------------------------------------- */
  /*                                partner:createApplication                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    placeholder: 'MyAPIAccess',
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
    displayName: 'Application Tax ID',
    name: 'applicationTaxID',
    type: 'string',
    default: '',
    placeholder: '65914571000187',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createApplication'],
      },
    },
    required: true,
    description:
      'The tax identifier of your account holder. This should be a raw string with only digits.',
  },
  {
    displayName: 'Application Tax ID Type',
    name: 'applicationTaxIDType',
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
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['createApplication'],
      },
    },
    required: true,
    description: 'Type of the tax ID',
  },

  /* -------------------------------------------------------------------------- */
  /*                                partner:getCompany                          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Tax ID',
    name: 'taxID',
    type: 'string',
    default: '',
    placeholder: '65914571000187',
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['getCompany'],
      },
    },
    required: true,
    description:
      'The raw tax ID from the preregistration that you want to get (only digits)',
  },

  /* -------------------------------------------------------------------------- */
  /*                                partner:listCompanies                       */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 20,
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['listCompanies'],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Skip',
    name: 'skip',
    type: 'number',
    typeOptions: {
      minValue: 0,
    },
    default: 0,
    displayOptions: {
      show: {
        resource: ['partner'],
        operation: ['listCompanies'],
      },
    },
    description: 'Number of results to skip',
  },
];
