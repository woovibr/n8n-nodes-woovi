import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createApplication(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const accountId = this.getNodeParameter('accountId', itemIndex) as string;
  const name = this.getNodeParameter('name', itemIndex) as string;
  const type = this.getNodeParameter('type', itemIndex) as string;

  const body: IDataObject = {
    accountId,
    application: {
      name,
      type,
    },
  };

  return apiRequest.call(this, 'POST', '/application', body);
}
