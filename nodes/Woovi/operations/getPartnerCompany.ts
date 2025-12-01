import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getPartnerCompany(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;

  return apiRequest.call(this, 'GET', `/partner/company/${taxID}`);
}
