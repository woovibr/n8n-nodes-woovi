import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createSubscription(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const value = this.getNodeParameter('value', itemIndex) as number;
  const type = this.getNodeParameter('type', itemIndex) as string;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;

  const customerName = this.getNodeParameter(
    'customerName',
    itemIndex,
  ) as string;
  const customerEmail = this.getNodeParameter(
    'customerEmail',
    itemIndex,
  ) as string;
  const customerPhone = this.getNodeParameter(
    'customerPhone',
    itemIndex,
  ) as string;
  const customerTaxID = this.getNodeParameter(
    'customerTaxID',
    itemIndex,
  ) as string;
  const customerAddress = this.getNodeParameter(
    'customerAddress',
    itemIndex,
  ) as IDataObject;

  const name = this.getNodeParameter('name', itemIndex, '') as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;
  const dayGenerateCharge = this.getNodeParameter(
    'dayGenerateCharge',
    itemIndex,
    5,
  ) as number;
  const frequency = this.getNodeParameter('frequency', itemIndex, '') as string;
  const dayDue = this.getNodeParameter('dayDue', itemIndex, 7) as number;

  if (!value) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo value é obrigatório',
      {
        itemIndex,
      },
    );
  }

  if (!type) {
    throw new NodeOperationError(this.getNode(), 'O campo type é obrigatório', {
      itemIndex,
    });
  }

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo correlationID é obrigatório',
      {
        itemIndex,
      },
    );
  }

  if (!customerName || !customerEmail || !customerPhone || !customerTaxID) {
    throw new NodeOperationError(
      this.getNode(),
      'Todos os campos do customer são obrigatórios: name, email, phone, taxID',
      { itemIndex },
    );
  }

  const optionalAddressField = 'complement';
  const missingAddressFields = Object.keys(customerAddress).filter(
    (field) => field !== optionalAddressField && !customerAddress[field],
  );

  if (missingAddressFields.length > 0) {
    throw new NodeOperationError(
      this.getNode(),
      `Endereço incompleto. Todos os campos (exceto '${optionalAddressField}') são obrigatórios. Faltando: ${missingAddressFields.join(', ')}`,
      { itemIndex },
    );
  }

  const customer: IDataObject = {
    name: customerName,
    email: customerEmail,
    phone: customerPhone,
    taxID: customerTaxID,
    address: customerAddress,
  };

  const body: IDataObject = {
    customer,
    value,
    type,
    correlationID,
  };

  if (name) {
    body.name = name;
  }

  if (comment) {
    body.comment = comment;
  }

  if (dayGenerateCharge) {
    body.dayGenerateCharge = dayGenerateCharge;
  }

  if (frequency) {
    body.frequency = frequency;
  }

  if (dayDue) {
    body.dayDue = dayDue;
  }

  return apiRequest.call(this, 'POST', '/subscriptions', body);
}
