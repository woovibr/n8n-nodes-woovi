import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function decodeEmv(this: IExecuteFunctions, itemIndex: number) {
  const emv = this.getNodeParameter('emv', itemIndex, '') as string;

  if (!emv) {
    throw new NodeOperationError(this.getNode(), 'O campo emv é obrigatório', {
      itemIndex,
    });
  }

  const body = { emv };

  return apiRequest.call(this, 'POST', '/decode/emv', body);
}
