import type {
  GenericValue,
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function apiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject | GenericValue | GenericValue[] = {},
  query: IDataObject = {},
) {
  const credentials = await this.getCredentials('wooviApi');

  const getQs = () => {
    if (!query) {
      return {};
    }

    return {
      qs: query,
    };
  };
  const options: IHttpRequestOptions = {
    method,
    body,
    ...getQs(),
    url: `${credentials.baseUrl}/v1${endpoint}`,
    headers: {
      // todo: remove this and user httpRequestWithAuthorization
      Authorization: credentials.Authorization,
      platform: 'N8N',
    },
  };

  return this.helpers.httpRequest.call(this, options);
}
