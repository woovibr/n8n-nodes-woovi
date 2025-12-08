import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createAccountRegister(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const officialName = this.getNodeParameter(
    'officialName',
    itemIndex,
  ) as string;
  const tradeName = this.getNodeParameter('tradeName', itemIndex) as string;
  const taxID = this.getNodeParameter('taxID', itemIndex) as string;
  const billingAddress = this.getNodeParameter(
    'billingAddress',
    itemIndex,
  ) as IDataObject;
  const documents = this.getNodeParameter(
    'documents',
    itemIndex,
  ) as Array<IDataObject>;
  const representatives = this.getNodeParameter(
    'representatives',
    itemIndex,
  ) as Array<IDataObject>;
  const businessDescription =
    (this.getNodeParameter('businessDescription', itemIndex) as string) ||
    undefined;
  const businessProduct =
    (this.getNodeParameter('businessProduct', itemIndex) as string) ||
    undefined;
  const businessLifetime =
    (this.getNodeParameter('businessLifetime', itemIndex) as string) ||
    undefined;
  const businessGoal =
    (this.getNodeParameter('businessGoal', itemIndex) as string) || undefined;

  if (!officialName) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'officialName' é obrigatório",
      { itemIndex },
    );
  }

  if (!tradeName) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'tradeName' é obrigatório",
      { itemIndex },
    );
  }

  if (!taxID) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'taxID' é obrigatório",
      { itemIndex },
    );
  }

  if (!billingAddress) {
    throw new NodeOperationError(
      this.getNode(),
      "O campo 'billingAddress' é obrigatório",
      { itemIndex },
    );
  }

  const body: IDataObject = {
    officialName,
    tradeName,
    taxID,
    billingAddress,
  };

  if (documents && documents.length) {
    body.documents = documents.map((d) => d.document as IDataObject);
  }

  if (representatives && representatives.length) {
    body.representatives = representatives.map(
      (r) => r.representative as IDataObject,
    );
  }

  if (businessDescription) body.businessDescription = businessDescription;
  if (businessProduct) body.businessProduct = businessProduct;
  if (businessLifetime) body.businessLifetime = businessLifetime;
  if (businessGoal) body.businessGoal = businessGoal;

  return apiRequest.call(this, 'POST', '/account-register', body);
}
