import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createCashbackFidelity(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex) as number;

  if (!taxID) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'taxID' é obrigatório",
      { itemIndex },
    );
  }

  if (typeof value === 'undefined' || value === null) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'value' é obrigatório",
      {
        itemIndex,
      },
    );
  }

  const body: IDataObject = { taxID, value };

  return apiRequest.call(this, 'POST', '/cashback-fidelity', body);
}
