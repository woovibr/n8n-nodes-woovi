import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listQrCodeStatic(
  this: IExecuteFunctions,
  index: number,
): Promise<any> {
  return await apiRequest.call(this, 'GET', '/qrcode-static');
}
