import type {
  IDataObject,
  IHttpRequestOptions,
  INodeExecutionData,
} from 'n8n-workflow';

export interface ExecuteContextOptions {
  parameters: IDataObject;
  credentials: { baseUrl: string; Authorization: string };
  response?: unknown;
  error?: unknown;
}

export interface MockExecuteContext extends IDataObject {
  helpers: {
    requestWithAuthentication: jest.Mock<Promise<unknown>, [string, IHttpRequestOptions]>;
    returnJsonArray: (data: IDataObject | IDataObject[]) => INodeExecutionData[];
    constructExecutionMetaData: (
      data: INodeExecutionData[],
      meta: IDataObject,
    ) => INodeExecutionData[];
  };
  getNodeParameter: (name: string, itemIndex: number, fallback?: unknown) => unknown;
  getCredentials: <T>(name: string) => Promise<T>;
  getNode: () => IDataObject;
  lastRequestOptions?: IHttpRequestOptions;
}

export const createExecuteContext = ({
  parameters,
  credentials,
  response,
  error,
}: ExecuteContextOptions): MockExecuteContext => {
  const context: Partial<MockExecuteContext> = {};

  context.getNodeParameter = (name: string, _itemIndex: number, fallback?: unknown) => {
    if (parameters[name] === undefined) {
      return fallback;
    }
    return parameters[name];
  };

  context.getCredentials = async <T>(_name: string) => {
    return credentials as unknown as T;
  };

  context.getNode = () => ({ name: 'Woovi' });

  const requestWithAuthentication = jest.fn(async (_name: string, options: IHttpRequestOptions) => {
    context.lastRequestOptions = options;
    if (error) {
      throw error;
    }
    return response;
  });

  context.helpers = {
    requestWithAuthentication,
    returnJsonArray: (data: IDataObject | IDataObject[]) => {
      const entries = Array.isArray(data) ? data : [data];
      return entries.map((entry) => ({ json: entry }));
    },
    constructExecutionMetaData: (data: INodeExecutionData[], _meta: IDataObject) => data,
  } as MockExecuteContext['helpers'];

  return context as MockExecuteContext;
};
