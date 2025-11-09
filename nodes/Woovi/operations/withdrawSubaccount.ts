import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function withdrawSubaccount(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('subaccountId', itemIndex) as string;
  const value = this.getNodeParameter('amount', itemIndex) as number;

  const body: IDataObject = { value };

  return apiRequest.call(this, 'POST', `/subaccount/${id}/withdraw`, body);
}
