import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createWebhook(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex, '') as string;
  const event = this.getNodeParameter('event', itemIndex, '') as string;
  const url = this.getNodeParameter('url', itemIndex, '') as string;
  const authorization = this.getNodeParameter(
    'authorization',
    itemIndex,
    '',
  ) as string;
  const isActive = this.getNodeParameter(
    'isActive',
    itemIndex,
    true,
  ) as boolean;

  const body = {
    webhook: {
      name,
      event,
      url,
      authorization,
      isActive,
    },
  };

  return apiRequest.call(this, 'POST', '/webhook', body);
}
