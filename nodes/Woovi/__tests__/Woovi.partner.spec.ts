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
      const taxID = { taxID: '12345678000195', type: 'BR:CNPJ' };
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        phone: '+5511999999999',
        taxID: { taxID: '12345678901', type: 'BR:CPF' },
      };

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
            case 'taxID':
              return taxID;
            case 'user':
              return user;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith(
        'POST',
        '/partner/company',
        {
          preRegistration: {
            name,
            taxID,
            website,
          },
          user,
        },
      );
    });
  });

  describe('Partner: createApplication', () => {
    it('should create a partner application', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const name = 'My App';
      const type = 'API';
      const taxID = { taxID: '12345678000195', type: 'BR:CNPJ' };

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
        'POST',
        '/partner/application',
        {
          application: {
            name,
            type,
          },
          taxID,
        },
      );
    });
  });
});
