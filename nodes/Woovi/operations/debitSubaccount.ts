import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function debitSubaccount(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('subaccountId', itemIndex) as string;
  const value = this.getNodeParameter('amount', itemIndex) as number;
  const description = this.getNodeParameter('operationDescription', itemIndex, '') as string;

  const body: IDataObject = { value };

  if (description) {
    body.description = description;
  }

  return apiRequest.call(this, 'POST', `/subaccount/${id}/debit`, body);
}
