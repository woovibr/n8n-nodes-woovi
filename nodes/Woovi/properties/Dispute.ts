import type { INodeProperties } from 'n8n-workflow';

export const disputeProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['dispute'] },
    },
    options: [
      { name: 'List Disputes', value: 'list' },
      { name: 'Get Dispute', value: 'get' },
      { name: 'Upload Evidence', value: 'uploadEvidence' },
    ],
    default: 'list',
  },
  {
    displayName: 'Start Date',
    name: 'start',
    type: 'string',
    default: '',
    placeholder: '2020-01-01T00:00:00Z',
    description: 'Start date used in the query (RFC 3339 format)',
    displayOptions: { show: { resource: ['dispute'], operation: ['list'] } },
  },
  {
    displayName: 'End Date',
    name: 'end',
    type: 'string',
    default: '',
    placeholder: '2020-12-01T17:00:00Z',
    description: 'End date used in the query (RFC 3339 format)',
    displayOptions: { show: { resource: ['dispute'], operation: ['list'] } },
  },
  {
    displayName: 'Dispute ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    description: 'Dispute endToEndId',
    displayOptions: {
      show: { resource: ['dispute'], operation: ['get', 'uploadEvidence'] },
    },
  },
  {
    displayName: 'Documents',
    name: 'documents',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    placeholder: 'Add Document',
    default: [],
    displayOptions: {
      show: { resource: ['dispute'], operation: ['uploadEvidence'] },
    },
    options: [
      {
        displayName: 'Document',
        name: 'document',
        values: [
          { displayName: 'URL', name: 'url', type: 'string', default: '' },
          {
            displayName: 'Correlation ID',
            name: 'correlationID',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
          },
        ],
      },
    ],
  },
];
