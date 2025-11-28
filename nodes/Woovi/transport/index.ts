import type {
  GenericValue,
  IHttpRequestOptions,
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  JsonObject,
} from 'n8n-workflow';

import { NodeApiError } from 'n8n-workflow';

export async function apiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object = {},
  query?: IDataObject,
): Promise<any> {
  query = query || {};

  type WooviApiCredentials = {
    Authorization: string;
    baseUrl: string;
    useSandbox?: boolean;
    sandboxAuthorization?: string;
    baseUrlSandbox?: string;
  };

  const credentials =
    await this.getCredentials<WooviApiCredentials>('wooviApi');

  const baseUrl = credentials.useSandbox
    ? credentials.baseUrlSandbox
    : credentials.baseUrl;
  const authHeader = credentials.useSandbox
    ? credentials.sandboxAuthorization
    : credentials.Authorization;

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
    url: `${baseUrl}/v1${endpoint}`,
    headers: {
      // todo: remove this and user httpRequestWithAuthorization
      Authorization: authHeader,
      platform: 'N8N',
    },
  };

  try {
    return await this.helpers.requestWithAuthentication.call(
      this,
      'wooviApi',
      options,
    );
  } catch (error) {
    if (error instanceof NodeApiError) {
      throw error;
    }
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }
}
