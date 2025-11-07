import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function transferSubaccounts(this: IExecuteFunctions, itemIndex: number) {
  const value = this.getNodeParameter('amount', itemIndex) as number;
  const fromPixKey = this.getNodeParameter('fromPixKey', itemIndex, '') as string;
  const toPixKey = this.getNodeParameter('toPixKey', itemIndex, '') as string;
  const correlationID = this.getNodeParameter('correlationID', itemIndex, '') as string;
  const description = this.getNodeParameter('operationDescription', itemIndex, '') as string;

  const body: IDataObject = { value };

  if (fromPixKey) {
    body.fromPixKey = fromPixKey;
  }

  if (toPixKey) {
    body.toPixKey = toPixKey;
  }

  if (correlationID) {
    body.correlationID = correlationID;
  }

  if (description) {
    body.description = description;
  }

  return apiRequest.call(this, 'POST', '/subaccount/transfer', body);
}
