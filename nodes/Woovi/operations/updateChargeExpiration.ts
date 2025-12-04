import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function updateChargeExpiration(
  this: IExecuteFunctions,
  itemIndex: number,
) {
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

  const expiresDate = this.getNodeParameter('expiresDate', itemIndex) as string;

  if (!expiresDate) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "expiresDate" é obrigatório (formato ISO 8601)',
      { itemIndex },
    );
  }

  const body: IDataObject = {
    expiresDate,
  };

  return apiRequest.call(
    this,
    'PATCH',
    `/charge/${encodeURIComponent(chargeId)}`,
    body,
  );
}
