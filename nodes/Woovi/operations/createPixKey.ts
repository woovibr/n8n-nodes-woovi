import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createPixKey(
  this: IExecuteFunctions,
  index: number,
): Promise<any> {
  const key = this.getNodeParameter('pixKey', index) as string;
  const type = this.getNodeParameter('pixKeyType', index) as string;

  const body = {
    key,
    type,
  };

  return await apiRequest.call(this, 'POST', '/pix-keys', body);
}
