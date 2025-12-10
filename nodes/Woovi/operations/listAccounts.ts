import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listAccounts(this: IExecuteFunctions, itemIndex: number) {
  return apiRequest.call(this, 'GET', '/account');
}
