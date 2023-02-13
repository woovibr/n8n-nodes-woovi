import { IDataObject, IExecuteFunctions, INodeExecutionData, INodePropertyOptions, INodeType, INodeTypeDescription, NodeApiError, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from './transport';
import { ILoadOptionsFunctions } from 'n8n-core';

export class WooviTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Woovi Trigger',
		name: 'wooviTrigger',
		icon: 'file:woovi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Handle Woovi Events via Webhook',

		defaults: {
			name: 'Woovi Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'wooviApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.openpix.com.br/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'User-Agent': 'n8n',
			},
		},
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				reponseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event Names or IDs',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description:
					'The event to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				typeOptions: {
					loadOptionsMethod: 'getEvents',
				},
				options: [],
			},
		],
	};

	methods = {
		loadOptions: {
			// Get all the events types to display them to user so that he can
			// select them easily
			async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				// TODO: Check if make sense the * event
				const returnData: INodePropertyOptions[] = [];
				let response;
				try {
					const endpoint = 'webhook/events';
					response = await apiRequest.call(this, 'GET', endpoint);
				} catch (error) {
					throw new NodeApiError(this.getNode(), error);
				}

				for (const event of response.events) {
					const eventName = event.name;
					const eventId = event.name;
					// TODO: Add description
					const eventDescription = event.name;

					returnData.push({
						name: eventName,
						value: eventId,
						description: eventDescription,
					});
				}
				return returnData;
			},
		},
	};
}
