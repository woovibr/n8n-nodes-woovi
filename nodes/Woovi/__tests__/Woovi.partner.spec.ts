import { mock } from 'jest-mock-extended';
import {
  type IExecuteFunctions,
  type INodeExecutionData,
  type IDataObject,
} from 'n8n-workflow';

import { Woovi } from '../Woovi.node';
import * as transport from '../transport';

jest.mock('../transport');

const apiRequestMock = jest.spyOn(transport, 'apiRequest');

describe('Woovi Node - Partner', () => {
  let woovi: Woovi;
  let mockExecuteFunctions: IExecuteFunctions;

  beforeEach(() => {
    woovi = new Woovi();
    mockExecuteFunctions = mock<IExecuteFunctions>();
    apiRequestMock.mockClear();
  });

  describe('Partner: createCompany', () => {
    it('should create a partner company (pre-registration)', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const name = 'My Company';
      const website = 'https://mycompany.com';
      const companyTaxID = '12345678000195';
      const companyTaxIDType = 'BR:CNPJ';
      const userFirstName = 'John';
      const userLastName = 'Doe';
      const userEmail = 'john@doe.com';
      const userPhone = '+5511999999999';
      const userTaxID = '12345678901';
      const userTaxIDType = 'BR:CPF';

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'partner';
            case 'operation':
              return 'createCompany';
            case 'name':
              return name;
            case 'website':
              return website;
            case 'companyTaxID':
              return companyTaxID;
            case 'companyTaxIDType':
              return companyTaxIDType;
            case 'userFirstName':
              return userFirstName;
            case 'userLastName':
              return userLastName;
            case 'userEmail':
              return userEmail;
            case 'userPhone':
              return userPhone;
            case 'userTaxID':
              return userTaxID;
            case 'userTaxIDType':
              return userTaxIDType;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith('POST', '/partner/company', {
        preRegistration: {
          name,
          taxID: {
            taxID: companyTaxID,
            type: companyTaxIDType,
          },
          website,
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
      });
    });
  });

  describe('Partner: createApplication', () => {
    it('should create a partner application', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const name = 'My App';
      const type = 'API';
      const applicationTaxID = '12345678000195';
      const applicationTaxIDType = 'BR:CNPJ';

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'partner';
            case 'operation':
              return 'createApplication';
            case 'name':
              return name;
            case 'type':
              return type;
            case 'applicationTaxID':
              return applicationTaxID;
            case 'applicationTaxIDType':
              return applicationTaxIDType;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith(
        'POST',
        '/partner/application',
        {
          application: {
            name,
            type,
          },
          taxID: {
            taxID: applicationTaxID,
            type: applicationTaxIDType,
          },
        },
      );
    });
  });

  describe('Partner: getCompany', () => {
    it('should get a partner company by taxID', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const taxID = '12345678000195';

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'partner';
            case 'operation':
              return 'getCompany';
            case 'taxID':
              return taxID;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith(
        'GET',
        `/partner/company/${taxID}`,
      );
    });
  });

  describe('Partner: listCompanies', () => {
    it('should list partner companies', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const limit = 10;
      const skip = 5;

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'partner';
            case 'operation':
              return 'listCompanies';
            case 'limit':
              return limit;
            case 'skip':
              return skip;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith(
        'GET',
        `/partner/company?limit=${limit}&skip=${skip}`,
      );
    });
  });
});
