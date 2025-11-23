import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function checkPixKey(this: IExecuteFunctions, itemIndex: number) {
  const pixKey = this.getNodeParameter('pixKey', itemIndex) as string;

  if (!pixKey) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo pixKey é obrigatório',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(
    this,
    'GET',
    `/pix-keys/${encodeURIComponent(pixKey)}/check`,
  );
}
