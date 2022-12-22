import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WooviApi implements ICredentialType {
	name = 'wooviApi';
	displayName = 'Woovi API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://developers.openpix.com.br/docs/apis/api-getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'Authorization',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.openpix.com.br/api',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{$credentials.Authorization}}',
			},
		},
	};
}
