import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listSubscriptions(
  this: IExecuteFunctions,
  _itemIndex: number,
) {
  const limit = this.getNodeParameter('limit', _itemIndex);
  const skip = this.getNodeParameter('skip', _itemIndex);

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  return apiRequest.call(this, 'GET', `/subscriptions?${params.toString()}`);
}
