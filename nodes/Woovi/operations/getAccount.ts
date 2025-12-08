import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getAccount(this: IExecuteFunctions, itemIndex: number) {
  const accountId = this.getNodeParameter('accountId', itemIndex) as string;

  return apiRequest.call(
    this,
    'GET',
    `/account/${encodeURIComponent(accountId)}`,
  );
}
