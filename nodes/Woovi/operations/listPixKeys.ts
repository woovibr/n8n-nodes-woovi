import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listPixKeys(this: IExecuteFunctions, _itemIndex: number) {
  return apiRequest.call(this, 'GET', '/pix-keys');
}
