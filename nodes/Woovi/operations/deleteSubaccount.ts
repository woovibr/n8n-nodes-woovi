import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function deleteSubaccount(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('subaccountId', itemIndex) as string;

  return apiRequest.call(this, 'DELETE', `/subaccount/${id}`);
}
