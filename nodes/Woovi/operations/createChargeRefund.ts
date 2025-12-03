import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createChargeRefund(
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

  const value = this.getNodeParameter('value', itemIndex) as string;
  const correlationID = this.getNodeParameter(
    'correlationIDRefund',
    itemIndex,
  ) as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;

  const body: IDataObject = {
    value,
    correlationID,
  };

  if (comment) {
    body.comment = comment;
  }

  return apiRequest.call(
    this,
    'POST',
    `/charge/${encodeURIComponent(chargeId)}/refund`,
    body,
  );
}
