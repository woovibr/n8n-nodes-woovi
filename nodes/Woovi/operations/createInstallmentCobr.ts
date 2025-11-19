import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createInstallmentCobr(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('id', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex, 0) as number;

  if (!id) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo id é obrigatório (globalID da parcela)',
      {
        itemIndex,
      },
    );
  }

  const body: IDataObject = {};

  if (value && value > 0) {
    body.value = value;
  }

  return apiRequest.call(
    this,
    'POST',
    `/installments/${encodeURIComponent(id)}/cobr`,
    body,
  );
}
