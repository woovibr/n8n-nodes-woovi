import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function validatePixKey(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const pixKey = this.getNodeParameter('pixKey', itemIndex) as string;

  return await apiRequest.call(
    this,
    'GET',
    `/fraud-validation/pix-key/${pixKey}`,
  );
}
