import { type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listPsps(this: IExecuteFunctions, itemIndex: number) {
  const ispb = this.getNodeParameter('ispb', itemIndex, '') as string;
  const name = this.getNodeParameter('name', itemIndex, '') as string;
  const compe = this.getNodeParameter('compe', itemIndex, '') as string;

  const params = new URLSearchParams();
  if (ispb) params.append('ispb', ispb);
  if (name) params.append('name', name);
  if (compe) params.append('compe', compe);

  const query = params.toString() ? `?${params.toString()}` : '';

  return apiRequest.call(this, 'GET', `/psp${query}`);
}
