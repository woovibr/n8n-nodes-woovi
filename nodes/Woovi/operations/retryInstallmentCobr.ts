import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function retryInstallmentCobr(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('id', itemIndex) as string;

  if (!id) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo id é obrigatório (globalID da parcela)',
      {
        itemIndex,
      },
    );
  }

  return apiRequest.call(
    this,
    'POST',
    `/installments/${encodeURIComponent(id)}/cobr/retry`,
    {},
  );
}
