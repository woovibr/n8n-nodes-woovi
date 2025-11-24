import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function listPayments(this: IExecuteFunctions, itemIndex: number) {
  const limit = this.getNodeParameter('limit', itemIndex) as number | undefined;
  const skip = this.getNodeParameter('skip', itemIndex) as number | undefined;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
    '',
  ) as string;
  const status = this.getNodeParameter('status', itemIndex, '') as string;

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  if (correlationID) params.append('correlationID', correlationID);
  if (status) params.append('status', status);

  return apiRequest.call(this, 'GET', `/payment?${params.toString()}`);
}
