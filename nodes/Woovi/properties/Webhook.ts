import type { INodeProperties } from 'n8n-workflow';

export const webhookProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
      },
    },
    options: [
      {
        name: 'List Webhooks',
        value: 'listWebhooks',
        description: 'List webhooks',
        action: 'List webhooks',
      },
      {
        name: 'Delete Webhook',
        value: 'deleteWebhook',
        description: 'Delete a webhook',
        action: 'Delete a webhook',
      },
    ],
    default: 'listWebhooks',
  },
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'webhook id',
    description: 'Webhook id to delete',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['deleteWebhook'],
      },
    },
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    description: 'Filter webhooks by URL',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['listWebhooks'],
      },
    },
  },
];
