import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function updateAccountRegister(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;
  const updateFields = this.getNodeParameter(
    'updateFields',
    itemIndex,
  ) as IDataObject;

  if (!taxID) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'taxID' é obrigatório",
      { itemIndex },
    );
  }

  if (!updateFields || Object.keys(updateFields).length === 0) {
    throw new NodeOperationError(
      this.getNode(),
      'Campos de atualização são obrigatórios',
      { itemIndex },
    );
  }
  const body: IDataObject = { ...updateFields };
  if (Array.isArray(updateFields?.documents) && updateFields.documents.length) {
    body.documents = (updateFields.documents as IDataObject[]).map(
      (d) => d.document as IDataObject,
    );
  }
  if (
    Array.isArray(updateFields?.representatives) &&
    updateFields.representatives.length
  ) {
    body.representatives = (updateFields.representatives as IDataObject[]).map(
      (r) => r.representative as IDataObject,
    );
  }

  return apiRequest.call(
    this,
    'PATCH',
    `/account-register/${encodeURIComponent(taxID)}`,
    body,
  );
}
