import type {
  GenericValue,
  IHttpRequestOptions,
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  // IRequestOptions,
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
	};

  const credentials = await this.getCredentials<WooviApiCredentials>('wooviApi');
	const baseUrl = credentials.baseUrl;

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
        Authorization: credentials.Authorization,
        platform: 'N8N',
      },
    };

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'wooviApi', options);
	} catch (error) {
		/*
		console.log("credentials: ", credentials);
		console.log("options: ", options);
		console.log("headers: ", options.headers);
		console.log("error apiRequest: ", error);
		*/
		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function apiRequestOld(
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
