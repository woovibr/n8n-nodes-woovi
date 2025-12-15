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

describe('Woovi Node - Application', () => {
  let woovi: Woovi;
  let mockExecuteFunctions: IExecuteFunctions;

  beforeEach(() => {
    woovi = new Woovi();
    mockExecuteFunctions = mock<IExecuteFunctions>();
    mockExecuteFunctions.helpers = {
      returnJsonArray: (data: IDataObject | IDataObject[]) => {
        const entries = Array.isArray(data) ? data : [data];
        return entries.map((entry) => ({ json: entry }));
      },
      constructExecutionMetaData: (
        data: INodeExecutionData[],
        _meta: IDataObject,
      ) => data,
    } as any;
    apiRequestMock.mockClear();
  });

  describe('Application: create', () => {
    it('should create an application for an account', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const accountId = '507f1f77bcf86cd799439011';
      const name = 'My App';
      const type = 'API';

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'application';
            case 'operation':
              return 'create';
            case 'accountId':
              return accountId;
            case 'name':
              return name;
            case 'type':
              return type;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith('POST', '/application', {
        accountId,
        application: {
          name,
          type,
        },
      });
    });
  });
  describe('Application: delete', () => {
    it('should delete an application using AppID auth', async () => {
      const items = [{ json: {} }] as INodeExecutionData[];
      const clientId = 'client_123abc';

      (mockExecuteFunctions.getInputData as jest.Mock).mockReturnValue(items);
      (mockExecuteFunctions.getNodeParameter as jest.Mock).mockImplementation(
        (paramName: string) => {
          switch (paramName) {
            case 'resource':
              return 'application';
            case 'operation':
              return 'delete';
            case 'clientId':
              return clientId;
            default:
              return undefined;
          }
        },
      );

      apiRequestMock.mockResolvedValue({ success: true });

      await woovi.execute.call(mockExecuteFunctions);

      expect(apiRequestMock).toHaveBeenCalledWith('DELETE', '/application', {
        clientId,
      });
    });
  });
});
