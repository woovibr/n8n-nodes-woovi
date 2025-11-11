import { type IDataObject, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createRefund(this: IExecuteFunctions, itemIndex: number) {
  const value = this.getNodeParameter('value', itemIndex) as string;
  const transactionEndToEndId = this.getNodeParameter(
    'transactionEndToEndId',
    itemIndex,
  ) as string;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;

  const body: IDataObject = {
    value,
    correlationID,
    transactionEndToEndId,
  };

  if (comment) {
    body.comment = comment;
  }

  return apiRequest.call(this, 'POST', '/refund', body);
}
