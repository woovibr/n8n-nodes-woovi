import { IHookFunctions, IExecuteFunctions, ILoadOptionsFunctions, IHttpRequestMethods, IDataObject, GenericValue, IHttpRequestOptions } from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	query: IDataObject = {},
) {
	const credentials = await this.getCredentials('WooviApi');

	const getQs = () => {
		if(!query) {
			return {}
		}

		return {
			qs: query,
		}
	}

	const options: IHttpRequestOptions = {
		method,
		body,
		...getQs(),
		url: `${credentials.baseUrl}/openpix/v1/${endpoint}`,
		headers: {
			// todo: remove this and user httpRequestWithAuthorization
			'Authorization': credentials.Authorization,
		},
	};

	return this.helpers.httpRequest.call(this, options);
}
