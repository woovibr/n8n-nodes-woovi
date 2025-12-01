import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listWebhooks(this: IExecuteFunctions, itemIndex: number) {
  const url = this.getNodeParameter('url', itemIndex, '') as string;
  const limit = this.getNodeParameter('limit', itemIndex, 20) as number;
  const skip = this.getNodeParameter('skip', itemIndex, 0) as number;

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));
  params.append('url', url ?? '');

  return apiRequest.call(this, 'GET', `/webhook?${params.toString()}`);
}
