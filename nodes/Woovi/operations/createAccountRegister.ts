import {
  IExecuteFunctions,
  IDataObject,
  NodeOperationError,
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

  const billingAddressInput = this.getNodeParameter(
    'billingAddress',
    itemIndex,
  ) as IDataObject;

  const zipcode = billingAddressInput.zipcode as string;
  const street = billingAddressInput.street as string;
  const number = billingAddressInput.number as string;
  const neighborhood = billingAddressInput.neighborhood as string;
  const city = billingAddressInput.city as string;
  const state = billingAddressInput.state as string;

  const representativesRaw = this.getNodeParameter(
    'representatives',
    itemIndex,
  ) as IDataObject;

  const representatives =
    (representativesRaw?.representative as IDataObject[]) || [];

  if (!representatives.length) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe ao menos 1 representante',
      { itemIndex },
    );
  }

  const mappedRepresentatives = representatives.map((rep) => {
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
      repObj.address = {
        zipcode: address.zipcode,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      };
    }

    return repObj;
  });

  const documentsRaw = this.getNodeParameter(
    'documents',
    itemIndex,
  ) as IDataObject;

  const documentsList = (documentsRaw?.document as IDataObject[]) || [];

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

  if (!zipcode) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe o CEP do endereço de cobrança',
      { itemIndex },
    );
  }
  if (!street) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe a rua do endereço de cobrança',
      { itemIndex },
    );
  }
  if (!number) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe o número do endereço de cobrança',
      { itemIndex },
    );
  }
  if (!neighborhood) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe o bairro do endereço de cobrança',
      { itemIndex },
    );
  }
  if (!city) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe a cidade do endereço de cobrança',
      { itemIndex },
    );
  }
  if (!state) {
    throw new NodeOperationError(
      this.getNode(),
      'Informe o estado do endereço de cobrança',
      { itemIndex },
    );
  }

  for (let i = 0; i < representatives.length; i++) {
    const rep = representatives[i];
    if (!rep.name) {
      throw new NodeOperationError(
        this.getNode(),
        `Representante ${i + 1}: Nome é obrigatório`,
        { itemIndex },
      );
    }
    if (!rep.birthDate) {
      throw new NodeOperationError(
        this.getNode(),
        `Representante ${i + 1}: Data de nascimento é obrigatória`,
        { itemIndex },
      );
    }
    if (!rep.email) {
      throw new NodeOperationError(
        this.getNode(),
        `Representante ${i + 1}: Email é obrigatório`,
        { itemIndex },
      );
    }
    if (!rep.taxID) {
      throw new NodeOperationError(
        this.getNode(),
        `Representante ${i + 1}: CNPJ é obrigatório`,
        { itemIndex },
      );
    }
  }

  const billingAddress: IDataObject = {
    zipcode,
    street,
    number,
    neighborhood,
    city,
    state,
  };

  const body: IDataObject = {
    officialName,
    tradeName,
    taxID,
    billingAddress,
    representatives: mappedRepresentatives,
  };

  if (documentsList && documentsList.length > 0) {
    body.documents = documentsList.map((d) => ({
      url: d.url,
      type: d.type,
    }));
  }

  if (businessDescription) {
    body.businessDescription = businessDescription;
  }
  if (businessProduct) {
    body.businessProduct = businessProduct;
  }
  if (businessLifetime) {
    body.businessLifetime = businessLifetime;
  }
  if (businessGoal) {
    body.businessGoal = businessGoal;
  }
  return apiRequest.call(this, 'POST', '/account-register', body);
}
