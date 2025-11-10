import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function updateCustomer(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;
  const name = this.getNodeParameter('name', itemIndex, '') as string;
  const taxID = this.getNodeParameter('taxID', itemIndex, '') as string;
  const email = this.getNodeParameter('email', itemIndex, '') as string;
  const phone = this.getNodeParameter('phone', itemIndex, '') as string;
  const address = this.getNodeParameter('address', itemIndex) as IDataObject;

  const body: IDataObject = {};

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo correlationID é obrigatório',
      { itemIndex },
    );
  }

  if (name) {
    body.name = name;
  }

  if (taxID) {
    body.taxID = taxID;
  }

  if (email) {
    body.email = email;
  }

  if (phone) {
    body.phone = phone;
  }

  const hasAddressData = Object.keys(address).some((field) => address[field]);

  if (hasAddressData) {
    const optionalAddressField = 'complement';

    const missingFields = Object.keys(address).filter(
      (field) => field !== optionalAddressField && !address[field],
    );

    if (missingFields.length > 0) {
      throw new NodeOperationError(
        this.getNode(),
        `Endereço incompleto. Todos os campos (exceto '${optionalAddressField}') são obrigatórios. Faltando: ${missingFields.join(', ')}`,
        { itemIndex },
      );
    }

    body.address = address;
  }

  return apiRequest.call(this, 'PATCH', `/customer/${correlationID}`, body);
}
