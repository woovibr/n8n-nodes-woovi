import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getInstallment(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('id', itemIndex) as string;

  if (!id) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo id é obrigatório (globalID ou endToEndId)',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(
    this,
    'GET',
    `/installments/${encodeURIComponent(id)}`,
  );
}
