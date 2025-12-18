import type { INodeProperties } from 'n8n-workflow';

export const applicationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['application'],
      },
    },
    options: [
      {
        name: 'Create Application',
        value: 'create',
        description: 'Create a new application for a company',
        action: 'Create a new application',
      },
      {
        name: 'Delete Application',
        value: 'delete',
        description: 'Deactivate an application (set isActive=false)',
        action: 'Delete an application',
      },
    ],
    default: 'create',
  },
  /* -------------------------------------------------------------------------- */
  /*                                application:create                            */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'string',
    default: '',
    placeholder: '507f1f77bcf86cd799439011',
    required: true,
    displayOptions: {
      show: {
        resource: ['application'],
        operation: ['create'],
      },
    },
    description: 'The ID of the company bank account',
  },
  {
    displayName: 'Application Name',
    name: 'name',
    type: 'string',
    default: '',
    placeholder: 'Test API',
    displayOptions: {
      show: {
        resource: ['application'],
        operation: ['create'],
      },
    },
    required: true,
    description: 'The name you want to give your application',
  },
  {
    displayName: 'Application Type',
    name: 'type',
    type: 'options',
    options: [
      { name: 'API', value: 'API' },
      { name: 'Plugin', value: 'PLUGIN' },
      { name: 'Oracle', value: 'ORACLE' },
    ],
    default: 'API',
    displayOptions: {
      show: {
        resource: ['application'],
        operation: ['create'],
      },
    },
    required: true,
    description: 'Type of the application that you want to register',
  },
  {
    displayName: 'Client ID',
    name: 'clientId',
    type: 'string',
    default: '',
    placeholder: 'client_123abc',
    displayOptions: {
      show: {
        resource: ['application'],
        operation: ['delete'],
      },
    },
    required: true,
    description: 'Client ID of the application to deactivate (required)',
  },
];
