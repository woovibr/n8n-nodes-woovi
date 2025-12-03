import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function deleteCharge(this: IExecuteFunctions, itemIndex: number) {
  const chargeId = this.getNodeParameter('chargeId', itemIndex) as string;

  if (!chargeId) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "chargeId" é obrigatório',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(
    this,
    'DELETE',
    `/charge/${encodeURIComponent(chargeId)}`,
  );
}
