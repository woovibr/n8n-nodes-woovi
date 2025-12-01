import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createPartnerCompany(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex) as string;
  const website = this.getNodeParameter('website', itemIndex, '') as string;
  const companyTaxID = this.getNodeParameter(
    'companyTaxID',
    itemIndex,
  ) as string;
  const companyTaxIDType = this.getNodeParameter(
    'companyTaxIDType',
    itemIndex,
  ) as string;
  const userFirstName = this.getNodeParameter(
    'userFirstName',
    itemIndex,
  ) as string;
  const userLastName = this.getNodeParameter(
    'userLastName',
    itemIndex,
  ) as string;
  const userEmail = this.getNodeParameter('userEmail', itemIndex) as string;
  const userPhone = this.getNodeParameter('userPhone', itemIndex) as string;
  const userTaxID = this.getNodeParameter('userTaxID', itemIndex) as string;
  const userTaxIDType = this.getNodeParameter(
    'userTaxIDType',
    itemIndex,
  ) as string;

  const body: IDataObject = {
    preRegistration: {
      name,
      taxID: {
        taxID: companyTaxID,
        type: companyTaxIDType,
      },
    },
    user: {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      phone: userPhone,
      taxID: {
        taxID: userTaxID,
        type: userTaxIDType,
      },
    },
  };

  if (website) {
    (body.preRegistration as IDataObject).website = website;
  }

  return apiRequest.call(this, 'POST', '/partner/company', body);
}
