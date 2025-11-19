import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function updateSubscriptionValue(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('id', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex) as number;

  if (!id) {
    throw new NodeOperationError(this.getNode(), 'O campo id é obrigatório', {
      itemIndex,
    });
  }

  if (!value || value <= 0) {
    throw new NodeOperationError(this.getNode(), 'O campo value é obrigatório e deve ser maior que zero', {
      itemIndex,
    });
  }

  const body: IDataObject = {
    value,
  };

  return apiRequest.call(this, 'PUT', `/subscriptions/${encodeURIComponent(id)}/value`, body);
}
