import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getRefund(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('id', itemIndex) as string;

  if (!id) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo id é obrigatório, CorrelationID ou RefundID',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(this, 'GET', `/refund/${id}`);
}
