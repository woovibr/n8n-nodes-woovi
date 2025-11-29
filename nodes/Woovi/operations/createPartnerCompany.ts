import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createPartnerCompany(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex) as string;
  const website = this.getNodeParameter('website', itemIndex, '') as string;
  const taxID = this.getNodeParameter('taxID', itemIndex) as IDataObject;
  const user = this.getNodeParameter('user', itemIndex) as IDataObject;

  const body: IDataObject = {
    preRegistration: {
      name,
      taxID,
    },
    user,
  };

  if (website) {
    (body.preRegistration as IDataObject).website = website;
  }

  return apiRequest.call(this, 'POST', '/partner/company', body);
}
