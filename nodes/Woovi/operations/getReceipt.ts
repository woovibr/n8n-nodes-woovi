import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getReceipt(this: IExecuteFunctions, itemIndex: number) {
  const receiptType = this.getNodeParameter(
    'receiptType',
    itemIndex,
    '',
  ) as string;
  const endToEndId = this.getNodeParameter(
    'endToEndId',
    itemIndex,
    '',
  ) as string;

  if (!receiptType) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo receiptType é obrigatório',
      {
        itemIndex,
      },
    );
  }

  if (!endToEndId) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo endToEndId é obrigatório',
      {
        itemIndex,
      },
    );
  }

  const allowed = ['pix-in', 'pix-out', 'pix-refund'];
  if (!allowed.includes(receiptType)) {
    throw new NodeOperationError(this.getNode(), 'receiptType inválido', {
      itemIndex,
    });
  }

  return apiRequest.call(
    this,
    'GET',
    `/receipt/${encodeURIComponent(receiptType)}/${encodeURIComponent(
      endToEndId,
    )}`,
  );
}
