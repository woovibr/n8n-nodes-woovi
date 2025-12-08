import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getAccountRegister(
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

  const params = new URLSearchParams();
  params.append('taxID', taxID);
  return apiRequest.call(this, 'GET', `/account-register?${params.toString()}`);
}
