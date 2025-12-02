import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function validateTaxId(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const taxId = this.getNodeParameter('taxId', itemIndex) as string;

  return await apiRequest.call(this, 'GET', `/fraud-validation/taxId/${taxId}`);
}
