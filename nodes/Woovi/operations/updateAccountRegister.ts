import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function updateAccountRegister(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;

  if (!taxID) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'taxID' é obrigatório para atualização",
      { itemIndex },
    );
  }

  const body: IDataObject = {};

  const businessDescription = this.getNodeParameter(
    'businessDescription',
    itemIndex,
    '',
  ) as string;
  const businessProduct = this.getNodeParameter(
    'businessProduct',
    itemIndex,
    '',
  ) as string;
  const businessLifetime = this.getNodeParameter(
    'businessLifetime',
    itemIndex,
    '',
  ) as string;
  const businessGoal = this.getNodeParameter(
    'businessGoal',
    itemIndex,
    '',
  ) as string;

  if (businessDescription) body.businessDescription = businessDescription;
  if (businessProduct) body.businessProduct = businessProduct;
  if (businessLifetime) body.businessLifetime = businessLifetime;
  if (businessGoal) body.businessGoal = businessGoal;

  const documentsRaw = this.getNodeParameter(
    'documents',
    itemIndex,
    {},
  ) as IDataObject;

  const documentsList = (documentsRaw?.document as IDataObject[]) || [];
  if (documentsList.length > 0) {
    body.documents = documentsList.map((d) => ({
      url: d.url,
      type: d.type,
    }));
  }

  const representativesRaw = this.getNodeParameter(
    'representatives',
    itemIndex,
    {},
  ) as IDataObject;

  const representatives =
    (representativesRaw?.representative as IDataObject[]) || [];

  if (representatives.length > 0) {
    body.representatives = representatives.map((rep) => {
      const repObj: IDataObject = {
        name: rep.name,
        birthDate: rep.birthDate,
        email: rep.email,
        taxID: rep.taxID,
        type: rep.type || 'ADMIN',
      };

      if (rep.phone) {
        repObj.phone = rep.phone;
      }

      const repDocs = rep.documents as IDataObject | undefined;
      if (
        repDocs?.document &&
        Array.isArray(repDocs.document) &&
        repDocs.document.length > 0
      ) {
        repObj.documents = (repDocs.document as IDataObject[]).map((d) => ({
          url: d.url,
          type: d.type,
        }));
      }

      if (rep.address) {
        const address = rep.address as IDataObject;
        const addressObj: IDataObject = {};

        if (address.zipcode) addressObj.zipcode = address.zipcode;
        if (address.street) addressObj.street = address.street;
        if (address.number) addressObj.number = address.number;
        if (address.neighborhood)
          addressObj.neighborhood = address.neighborhood;
        if (address.city) addressObj.city = address.city;
        if (address.state) addressObj.state = address.state;

        if (Object.keys(addressObj).length > 0) {
          repObj.address = addressObj;
        }
      }

      return repObj;
    });
  }

  if (Object.keys(body).length === 0) {
    throw new NodeOperationError(
      this.getNode(),
      'Nenhum campo foi fornecido para atualização. Informe ao menos um campo.',
      { itemIndex },
    );
  }

  return apiRequest.call(
    this,
    'PATCH',
    `/account-register/${encodeURIComponent(taxID)}`,
    body,
  );
}
