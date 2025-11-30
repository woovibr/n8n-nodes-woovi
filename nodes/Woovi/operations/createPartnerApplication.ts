import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createPartnerApplication(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex) as string;
  const type = this.getNodeParameter('type', itemIndex) as string;
  const applicationTaxID = this.getNodeParameter(
    'applicationTaxID',
    itemIndex,
  ) as string;
  const applicationTaxIDType = this.getNodeParameter(
    'applicationTaxIDType',
    itemIndex,
  ) as string;

  const body: IDataObject = {
    application: {
      name,
      type,
    },
    taxID: {
      taxID: applicationTaxID,
      type: applicationTaxIDType,
    },
  };

  return apiRequest.call(this, 'POST', '/partner/application', body);
}
