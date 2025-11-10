import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listCustomers(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const limit = this.getNodeParameter('limit', itemIndex);
  const skip = this.getNodeParameter('skip', itemIndex);

  const urlParams = `?limit=${limit ?? 20}&skip=${skip ?? 0}`;

  return apiRequest.call(this, 'GET', `/customer${urlParams}`);
}
