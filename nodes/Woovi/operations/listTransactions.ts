import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listTransactions(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const start = this.getNodeParameter('start', itemIndex) as string | undefined;
  const end = this.getNodeParameter('end', itemIndex) as string | undefined;
  const charge = this.getNodeParameter('charge', itemIndex) as
    | string
    | undefined;
  const pixQrCode = this.getNodeParameter('pixQrCode', itemIndex) as
    | string
    | undefined;
  const withdrawal = this.getNodeParameter('withdrawal', itemIndex) as
    | string
    | undefined;

  const params = new URLSearchParams();

  if (start) {
    params.append('start', start);
  }
  if (end) {
    params.append('end', end);
  }
  if (charge) {
    params.append('charge', charge);
  }
  if (pixQrCode) {
    params.append('pixQrCode', pixQrCode);
  }
  if (withdrawal) {
    params.append('withdrawal', withdrawal);
  }

  return apiRequest.call(this, 'GET', `/transaction?${params.toString()}`);
}
