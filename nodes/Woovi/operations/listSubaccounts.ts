import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listSubaccounts(this: IExecuteFunctions, _itemIndex: number) {
  return apiRequest.call(this, 'GET', '/subaccount');
}
