import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function approvePayment(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const correlationID = this.getNodeParameter('correlationID', itemIndex) as string;

  if (!correlationID) {
    throw new NodeOperationError(this.getNode(), 'O campo correlationID é obrigatório');
  }

  const body = { correlationID };

  return await apiRequest.call(this, 'POST', '/payment/approve', body);
}
