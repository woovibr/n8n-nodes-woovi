import type { INodeProperties } from 'n8n-workflow';

export const statementProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['statement'],
      },
    },
    options: [{ name: 'Get Statement', value: 'list' }],
    default: 'list',
  },
  {
    displayName: 'Start Date',
    name: 'start',
    type: 'string',
    default: '',
    placeholder: '2020-01-01T00:00:00Z',
    description:
      'Start date used in the query (RFC 3339 format, e.g. 2020-01-01T00:00:00Z)',
    displayOptions: {
      show: {
        resource: ['statement'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'End Date',
    name: 'end',
    type: 'string',
    default: '',
    placeholder: '2020-12-01T17:00:00Z',
    description:
      'End date used in the query (RFC 3339 format, e.g. 2020-12-01T17:00:00Z)',
    displayOptions: {
      show: {
        resource: ['statement'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Skip',
    name: 'skip',
    type: 'number',
    default: 0,
    description: 'Skip count to paginate results',
    displayOptions: {
      show: {
        resource: ['statement'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    description: 'Limit the number of results returned',
    displayOptions: {
      show: {
        resource: ['statement'],
        operation: ['list'],
      },
    },
  },
];
