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
        value: 'list',
        description: 'List webhooks',
        action: 'List webhooks',
      },
      {
        name: 'Delete Webhook',
        value: 'delete',
        description: 'Delete a webhook',
        action: 'Delete a webhook',
      },
      {
        name: 'Create Webhook',
        value: 'create',
        description: 'Create a new webhook',
        action: 'Create a webhook',
      },
      {
        name: 'Get Webhook IPs',
        value: 'getIps',
        description: 'Get a list of IPs used for callbacks',
        action: 'Get webhook IPs',
      },
    ],
    default: 'list',
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
        operation: ['delete'],
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
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    placeholder: '20',
    description: 'Number of items to return',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Skip',
    name: 'skip',
    type: 'number',
    default: 0,
    placeholder: '0',
    description: 'Number of items to skip',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['list'],
      },
    },
  },

  // create webhook fields
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    description: 'Webhook name',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Event',
    name: 'event',
    type: 'options',
    options: [
      { name: 'OPENPIX:CHARGE_CREATED', value: 'OPENPIX:CHARGE_CREATED' },
      { name: 'OPENPIX:CHARGE_COMPLETED', value: 'OPENPIX:CHARGE_COMPLETED' },
      { name: 'OPENPIX:CHARGE_EXPIRED', value: 'OPENPIX:CHARGE_EXPIRED' },
      {
        name: 'OPENPIX:CHARGE_COMPLETED_NOT_SAME_CUSTOMER_PAYER',
        value: 'OPENPIX:CHARGE_COMPLETED_NOT_SAME_CUSTOMER_PAYER',
      },
      {
        name: 'OPENPIX:TRANSACTION_RECEIVED',
        value: 'OPENPIX:TRANSACTION_RECEIVED',
      },
      {
        name: 'OPENPIX:TRANSACTION_REFUND_RECEIVED',
        value: 'OPENPIX:TRANSACTION_REFUND_RECEIVED',
      },
      {
        name: 'PIX_TRANSACTION_REFUND_RECEIVED_CONFIRMED',
        value: 'PIX_TRANSACTION_REFUND_RECEIVED_CONFIRMED',
      },
      {
        name: 'PIX_TRANSACTION_REFUND_SENT_CONFIRMED',
        value: 'PIX_TRANSACTION_REFUND_SENT_CONFIRMED',
      },
      {
        name: 'PIX_TRANSACTION_REFUND_RECEIVED_REJECTED',
        value: 'PIX_TRANSACTION_REFUND_RECEIVED_REJECTED',
      },
      {
        name: 'PIX_TRANSACTION_REFUND_SENT_REJECTED',
        value: 'PIX_TRANSACTION_REFUND_SENT_REJECTED',
      },
      {
        name: 'OPENPIX:MOVEMENT_CONFIRMED',
        value: 'OPENPIX:MOVEMENT_CONFIRMED',
      },
      { name: 'OPENPIX:MOVEMENT_FAILED', value: 'OPENPIX:MOVEMENT_FAILED' },
      { name: 'OPENPIX:MOVEMENT_REMOVED', value: 'OPENPIX:MOVEMENT_REMOVED' },
      { name: 'OPENPIX:DISPUTE_CREATED', value: 'OPENPIX:DISPUTE_CREATED' },
      { name: 'OPENPIX:DISPUTE_ACCEPTED', value: 'OPENPIX:DISPUTE_ACCEPTED' },
      { name: 'OPENPIX:DISPUTE_REJECTED', value: 'OPENPIX:DISPUTE_REJECTED' },
      { name: 'OPENPIX:DISPUTE_CANCELED', value: 'OPENPIX:DISPUTE_CANCELED' },
      { name: 'ACCOUNT_REGISTER_APPROVED', value: 'ACCOUNT_REGISTER_APPROVED' },
      { name: 'ACCOUNT_REGISTER_REJECTED', value: 'ACCOUNT_REGISTER_REJECTED' },
      { name: 'ACCOUNT_REGISTER_PENDING', value: 'ACCOUNT_REGISTER_PENDING' },
      { name: 'PIX_AUTOMATIC_APPROVED', value: 'PIX_AUTOMATIC_APPROVED' },
      { name: 'PIX_AUTOMATIC_REJECTED', value: 'PIX_AUTOMATIC_REJECTED' },
      {
        name: 'PIX_AUTOMATIC_COBR_CREATED',
        value: 'PIX_AUTOMATIC_COBR_CREATED',
      },
      {
        name: 'PIX_AUTOMATIC_COBR_APPROVED',
        value: 'PIX_AUTOMATIC_COBR_APPROVED',
      },
      {
        name: 'PIX_AUTOMATIC_COBR_REJECTED',
        value: 'PIX_AUTOMATIC_COBR_REJECTED',
      },
      {
        name: 'PIX_AUTOMATIC_COBR_TRY_REJECTED',
        value: 'PIX_AUTOMATIC_COBR_TRY_REJECTED',
      },
      {
        name: 'PIX_AUTOMATIC_COBR_TRY_REQUESTED',
        value: 'PIX_AUTOMATIC_COBR_TRY_REQUESTED',
      },
      {
        name: 'PIX_AUTOMATIC_COBR_COMPLETED',
        value: 'PIX_AUTOMATIC_COBR_COMPLETED',
      },
    ],
    default: 'OPENPIX:TRANSACTION_RECEIVED',
    description: 'Event to listen to',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    placeholder: 'https://yourapp.com/webhook',
    description: 'Webhook callback URL',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Authorization',
    name: 'authorization',
    type: 'string',
    default: '',
    description: 'Authorization header set by the callback to your app',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['createWebhook'],
      },
    },
  },
  {
    displayName: 'Is Active',
    name: 'isActive',
    type: 'boolean',
    default: true,
    description: 'Activate webhook after creation',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['createWebhook'],
      },
    },
  },
];
