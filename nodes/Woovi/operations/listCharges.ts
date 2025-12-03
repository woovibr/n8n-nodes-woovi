import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listCharges(this: IExecuteFunctions, itemIndex: number) {
  const start = this.getNodeParameter('start', itemIndex) as string | undefined;
  const end = this.getNodeParameter('end', itemIndex) as string | undefined;
  const status = this.getNodeParameter('status', itemIndex) as
    | string
    | undefined;
  const customer = this.getNodeParameter('customer', itemIndex) as
    | string
    | undefined;
  const subscription = this.getNodeParameter('subscription', itemIndex) as
    | string
    | undefined;
  const limit = this.getNodeParameter('limit', itemIndex) as number | undefined;
  const skip = this.getNodeParameter('skip', itemIndex) as number | undefined;

  const params = new URLSearchParams();
  if (start) params.append('start', start);
  if (end) params.append('end', end);
  if (status) params.append('status', status);
  if (customer) params.append('customer', customer);
  if (subscription) params.append('subscription', subscription);
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  const query = params.toString();
  const endpoint = query ? `/charge?${query}` : '/charge';

  return apiRequest.call(this, 'GET', endpoint);
}
