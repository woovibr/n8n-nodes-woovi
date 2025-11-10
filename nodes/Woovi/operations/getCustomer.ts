import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getCustomer(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('id', itemIndex) as string;

  return apiRequest.call(this, 'GET', `/customer/${id}`);
}
