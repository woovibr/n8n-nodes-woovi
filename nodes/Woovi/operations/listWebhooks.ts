import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listWebhooks(this: IExecuteFunctions, itemIndex: number) {
  const url = this.getNodeParameter('url', itemIndex, '') as string;

  const params = new URLSearchParams();
  if (url) params.append('url', url);

  return apiRequest.call(
    this,
    'GET',
    `/webhook${params.toString() ? `?${params.toString()}` : ''}`,
  );
}
