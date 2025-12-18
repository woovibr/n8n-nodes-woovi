import type { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listStatement(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const start = this.getNodeParameter('start', itemIndex) as string | undefined;
  const end = this.getNodeParameter('end', itemIndex) as string | undefined;
  const skip = this.getNodeParameter('skip', itemIndex) as number | undefined;
  const limit = this.getNodeParameter('limit', itemIndex) as number | undefined;

  const params = new URLSearchParams();

  if (start) params.append('start', start);
  if (end) params.append('end', end);
  if (typeof skip === 'number') params.append('skip', String(skip));
  if (typeof limit === 'number') params.append('limit', String(limit));

  return apiRequest.call(this, 'GET', `/statement?${params.toString()}`);
}
