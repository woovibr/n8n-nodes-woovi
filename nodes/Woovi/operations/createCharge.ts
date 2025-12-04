import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createCharge(this: IExecuteFunctions, itemIndex: number) {
  const value = this.getNodeParameter('chargeValue', itemIndex) as number;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
    '',
  ) as string;
  const type = this.getNodeParameter('type', itemIndex, '') as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;
  const expiresIn = this.getNodeParameter('expiresIn', itemIndex, undefined) as
    | number
    | undefined;
  const expiresDate = this.getNodeParameter(
    'expiresDate',
    itemIndex,
    '',
  ) as string;
  const returnExisting = this.getNodeParameter(
    'returnExisting',
    itemIndex,
    false,
  ) as boolean;

  const customer = this.getNodeParameter('customer', itemIndex, undefined) as
    | IDataObject
    | undefined;
  const daysForDueDate = this.getNodeParameter(
    'daysForDueDate',
    itemIndex,
    undefined,
  ) as number | undefined;
  const daysAfterDueDate = this.getNodeParameter(
    'daysAfterDueDate',
    itemIndex,
    undefined,
  ) as number | undefined;
  const interests = this.getNodeParameter('interests', itemIndex, undefined) as
    | IDataObject
    | undefined;
  const fines = this.getNodeParameter('fines', itemIndex, undefined) as
    | IDataObject
    | undefined;
  const discountSettings = this.getNodeParameter(
    'discountSettings',
    itemIndex,
    undefined,
  ) as IDataObject | undefined;
  const additionalInfo = this.getNodeParameter(
    'additionalInfo',
    itemIndex,
    undefined,
  ) as IDataObject[] | undefined;
  const enableCashbackPercentage = this.getNodeParameter(
    'enableCashbackPercentage',
    itemIndex,
    undefined,
  ) as boolean | undefined;
  const enableCashbackExclusivePercentage = this.getNodeParameter(
    'enableCashbackExclusivePercentage',
    itemIndex,
    undefined,
  ) as boolean | undefined;
  const subaccount = this.getNodeParameter(
    'subaccount',
    itemIndex,
    undefined,
  ) as string | undefined;
  const splits = this.getNodeParameter('splits', itemIndex, undefined) as
    | IDataObject[]
    | undefined;

  const body: IDataObject = {
    value,
  };

  if (correlationID) body.correlationID = correlationID;
  if (type) body.type = type;
  if (comment) body.comment = comment;
  if (expiresIn && typeof expiresIn === 'number') body.expiresIn = expiresIn;
  if (expiresDate) body.expiresDate = expiresDate;

  const hasCustomerData =
    customer && Object.keys(customer).some((f) => (customer as any)[f]);
  if (hasCustomerData) {
    const name = customer?.name as string | undefined;
    const email = customer?.email as string | undefined;
    const phone = customer?.phone as string | undefined;
    const taxID = customer?.taxID as string | undefined;
    const correlationIDCustomer = customer?.correlationID as string | undefined;
    const address = customer?.address as IDataObject | undefined;
    const ensureSameTaxID = customer?.ensureSameTaxID as boolean | undefined;

    if (!name) {
      throw new NodeOperationError(
        this.getNode(),
        "O campo 'name' do customer é obrigatório ao enviar o objeto customer",
        {
          itemIndex,
        },
      );
    }

    if (!taxID && !email && !phone) {
      throw new NodeOperationError(
        this.getNode(),
        'Um desses campos taxID, email, ou phone deve ser fornecido ao enviar o objeto customer',
        {
          itemIndex,
        },
      );
    }

    const customerBody: IDataObject = {};
    if (name) customerBody.name = name;
    if (email) customerBody.email = email;
    if (phone) customerBody.phone = phone;
    if (taxID) customerBody.taxID = taxID;
    if (correlationIDCustomer)
      customerBody.correlationID = correlationIDCustomer;

    const hasAddressData =
      address && Object.keys(address).some((f) => (address as any)[f]);
    if (hasAddressData) {
      const optionalAddressField = 'complement';
      const missingFields = Object.keys(address as IDataObject).filter(
        (field) => field !== optionalAddressField && !(address as any)[field],
      );
      if (missingFields.length > 0) {
        throw new NodeOperationError(
          this.getNode(),
          `Endereço incompleto. Todos os campos (exceto '${optionalAddressField}') são obrigatórios. Faltando: ${missingFields.join(', ')}`,
          { itemIndex },
        );
      }
      customerBody.address = address;
    }

    if (ensureSameTaxID) customerBody.ensureSameTaxID = ensureSameTaxID;

    if (Object.keys(customerBody).length > 0) body.customer = customerBody;
  }

  if (typeof daysForDueDate === 'number') {
    body.daysForDueDate = daysForDueDate;
  }

  if (typeof daysAfterDueDate === 'number') {
    body.daysAfterDueDate = daysAfterDueDate;
  }

  if (interests?.value) {
    body.interests = { value: interests.value };
  }

  if (fines?.value) {
    body.fines = { value: fines.value };
  }

  if (discountSettings?.modality || discountSettings?.discountFixedDate) {
    const modality = discountSettings.modality as string;
    const discountFixedDate =
      discountSettings.discountFixedDate as IDataObject[];

    const ds: IDataObject = {};
    if (modality) ds.modality = modality;
    if (discountFixedDate && Array.isArray(discountFixedDate)) {
      ds.discountFixedDate = discountFixedDate;
    }
    body.discountSettings = ds;
  }

  if (Array.isArray(additionalInfo) && additionalInfo.length > 0) {
    body.additionalInfo = additionalInfo;
  }

  if (typeof enableCashbackPercentage !== 'undefined')
    body.enableCashbackPercentage = enableCashbackPercentage;
  if (typeof enableCashbackExclusivePercentage !== 'undefined')
    body.enableCashbackExclusivePercentage = enableCashbackExclusivePercentage;

  if (subaccount) body.subaccount = subaccount;

  if (Array.isArray(splits) && splits.length > 0) {
    body.splits = splits;
  }

  // Query param for idempotency
  const params = new URLSearchParams();
  if (returnExisting) {
    params.append('return_existing', 'true');
  }
  return apiRequest.call(this, 'POST', `/charge?${params.toString()}`, body);
}
