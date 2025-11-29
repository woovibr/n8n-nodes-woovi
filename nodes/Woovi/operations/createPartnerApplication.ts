import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createPartnerApplication(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex) as string;
  const type = this.getNodeParameter('type', itemIndex) as string;
  const taxID = this.getNodeParameter('taxID', itemIndex) as IDataObject;

  const body: IDataObject = {
    application: {
      name,
      type,
    },
    taxID,
  };

  return apiRequest.call(this, 'POST', '/partner/application', body);
}
