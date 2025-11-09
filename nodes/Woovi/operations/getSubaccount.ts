import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getSubaccount(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('subaccountId', itemIndex) as string;

  return apiRequest.call(this, 'GET', `/subaccount/${id}`);
}
