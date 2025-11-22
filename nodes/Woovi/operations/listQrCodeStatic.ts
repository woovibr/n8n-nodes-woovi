import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function listQrCodeStatic(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const limit = this.getNodeParameter('limit', itemIndex);
  const skip = this.getNodeParameter('skip', itemIndex);

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  return apiRequest.call(this, 'GET', `/qrcode-static?${params.toString()}`);
}
