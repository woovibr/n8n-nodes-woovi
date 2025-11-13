import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function cancelInvoice(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "Correlation ID" é obrigatório',
      { itemIndex },
    );
  }

  return apiRequest.call(this, 'POST', `/invoice/${correlationID}/cancel`);
}
