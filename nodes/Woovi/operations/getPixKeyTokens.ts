import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getPixKeyTokens(
  this: IExecuteFunctions,
  _itemIndex: number,
): Promise<any> {
  return await apiRequest.call(this, 'GET', '/pix-keys/tokens');
}
