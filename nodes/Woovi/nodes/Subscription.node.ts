import type { INodeProperties } from 'n8n-workflow';

export const subscriptionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['subscription'],
      },
    },
    options: [
      { name: 'Get Subscription', value: 'getSubscription' },
      { name: 'List Subscription Installments', value: 'listSubscriptionInstallments' },
    ],
    default: 'getSubscription',
  },
  {
    displayName: 'Subscription ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'subscription_id_123',
    description: 'ID of the subscription',
    displayOptions: {
      show: {
        resource: ['subscription'],
        operation: ['getSubscription', 'listSubscriptionInstallments'],
      },
    },
  },
];
