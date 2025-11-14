import {
  NodeOperationError,
  type IDataObject,
  type IExecuteFunctions,
} from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createInvoice(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const description = this.getNodeParameter('description', itemIndex) as string;
  const billingDate = this.getNodeParameter('billingDate', itemIndex) as string;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;
  const charge = this.getNodeParameter('charge', itemIndex, '') as string;
  const value = this.getNodeParameter('value', itemIndex, 0) as number;
  const customerId = this.getNodeParameter(
    'customerId',
    itemIndex,
    '',
  ) as string;
  const customer = this.getNodeParameter(
    'customer',
    itemIndex,
    {},
  ) as IDataObject;

  if (!billingDate) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "Billing Date" é obrigatório',
      { itemIndex },
    );
  }

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "Correlation ID" é obrigatório',
      { itemIndex },
    );
  }

  if (!charge && !value) {
    throw new NodeOperationError(
      this.getNode(),
      'Um dos campos "Charge" ou "Value" deve ser fornecido',
      { itemIndex },
    );
  }

  const body: IDataObject = {
    billingDate,
    correlationID,
  };

  if (description) {
    body.description = description;
  }

  if (charge) {
    body.charge = charge;
  }

  if (value) {
    body.value = value;
  }

  if (customerId) {
    body.customerId = customerId;
  }

  const hasCustomerData = Object.keys(customer).some(
    (field) => customer[field],
  );

  if (hasCustomerData) {
    const requiredCustomerFields = ['taxID', 'name', 'email', 'phone'];
    const missingFields = requiredCustomerFields.filter(
      (field) => !customer[field],
    );

    if (missingFields.length > 0) {
      throw new NodeOperationError(
        this.getNode(),
        `Customer incompleto. Campos obrigatórios faltando: ${missingFields.join(', ')}`,
        { itemIndex },
      );
    }

    const address = customer.address as IDataObject;
    const hasAddressData =
      address && Object.keys(address).some((field) => address[field]);

    if (hasAddressData) {
      const optionalAddressField = 'complement';
      const missingAddressFields = Object.keys(address).filter(
        (field) => field !== optionalAddressField && !address[field],
      );

      if (missingAddressFields.length > 0) {
        throw new NodeOperationError(
          this.getNode(),
          `Endereço do customer incompleto. Todos os campos (exceto '${optionalAddressField}') são obrigatórios. Faltando: ${missingAddressFields.join(', ')}`,
          { itemIndex },
        );
      }
    }

    body.customer = customer;
  }

  return apiRequest.call(this, 'POST', '/invoice', body);
}
