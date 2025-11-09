import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createSubaccount(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const pixKey = this.getNodeParameter('subaccountPixKey', itemIndex) as string;
  const name = this.getNodeParameter('subaccountName', itemIndex, '') as string;

  const body: IDataObject = {};

  if (pixKey) {
    body.pixKey = pixKey;
  }

  if (name) {
    body.name = name;
  }

  return apiRequest.call(this, 'POST', '/subaccount', body);
}
