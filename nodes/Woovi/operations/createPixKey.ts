import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createPixKey(this: IExecuteFunctions, itemIndex: number) {
  const type = this.getNodeParameter('pixKeyType', itemIndex) as string;
  const key = this.getNodeParameter('pixKey', itemIndex, '') as string;

  const body: Record<string, any> = {
    type,
  };

  if (type === 'CNPJ' || key) {
    body.key = key;
  }

  return apiRequest.call(this, 'POST', '/pix-keys', body);
}
