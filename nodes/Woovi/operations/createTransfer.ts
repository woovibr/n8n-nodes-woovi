import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createTransfer(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const value = this.getNodeParameter('value', itemIndex) as number;
  const fromPixKey = this.getNodeParameter(
    'fromPixKey',
    itemIndex,
    '',
  ) as string;
  const toPixKey = this.getNodeParameter('toPixKey', itemIndex, '') as string;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
    '',
  ) as string;

  if (!value) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo value é obrigatório',
      {
        itemIndex,
      },
    );
  }

  const body: IDataObject = { value };

  if (fromPixKey) body.fromPixKey = fromPixKey;
  if (toPixKey) body.toPixKey = toPixKey;
  if (correlationID) body.correlationID = correlationID;

  return apiRequest.call(this, 'POST', '/transfer', body);
}
