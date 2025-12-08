import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function deleteAccountRegister(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;

  if (!taxID) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'taxID' é obrigatório",
      { itemIndex },
    );
  }

  return apiRequest.call(
    this,
    'DELETE',
    `/account-register/${encodeURIComponent(taxID)}`,
  );
}
