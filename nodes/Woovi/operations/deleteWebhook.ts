import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function deleteWebhook(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('webhookId', itemIndex) as string;

  return apiRequest.call(this, 'DELETE', `/webhook/${id}`);
}
