import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getCharge(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('chargeId', itemIndex) as string;

  if (!id) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "chargeId" é obrigatório',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(this, 'GET', `/charge/${encodeURIComponent(id)}`);
}
