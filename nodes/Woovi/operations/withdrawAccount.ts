import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function withdrawAccount(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const accountId = this.getNodeParameter('accountId', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex) as number;

  if (!accountId) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'accountId' é obrigatório",
      { itemIndex },
    );
  }

  if (!value) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'value' é obrigatório",
      { itemIndex },
    );
  }

  const body: IDataObject = { value };

  return apiRequest.call(
    this,
    'POST',
    `/account/${encodeURIComponent(accountId)}/withdraw`,
    body,
  );
}
