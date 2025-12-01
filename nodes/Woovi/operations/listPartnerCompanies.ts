import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listPartnerCompanies(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const limit = this.getNodeParameter('limit', itemIndex) as number | undefined;
  const skip = this.getNodeParameter('skip', itemIndex) as number | undefined;

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  return apiRequest.call(this, 'GET', `/partner/company?${params.toString()}`);
}
