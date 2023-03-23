import {
	IHookFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeApiError,
} from 'n8n-workflow';
import { apiRequest } from './transport';

export class WooviTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Woovi Trigger',
		name: 'wooviTrigger',
		icon: 'file:woovi.svg',
		group: ['trigger'],
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
				displayName: 'Event Names or Name or ID',
				name: 'events',
				type: 'options',
				required: true,
				default: '',
				description:
					'The event to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
	webhookMethods = {
		default: {
			async create(this: IHookFunctions): Promise<boolean> {
				let webhook;
				const webhookUrl = this.getNodeWebhookUrl('default');

				const events = this.getNodeParameter('events', []) as string[];
				const body = {
					name: 'N8N Webhook',
					url: webhookUrl,
					event: events,
					isActive: true,
				};

				try {
					webhook = await apiRequest.call(this, 'POST', 'webhook?validate=false', {
						webhook: body,
					});
				} catch (error) {
					throw new NodeApiError(this.getNode(), error);
				}

				if (webhook.id === undefined) {
					return false;
				}
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = webhook.id as string;

				console.dir({ webhook, webhookData }, { depth: null, colors: true });
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				console.dir({ webhookData }, { depth: null, colors: true });
				if (webhookData.webhookId !== undefined) {
					try {
						await apiRequest.call(this, 'DELETE', `webhook/${webhookData.webhookId}`, {});
					} catch (error) {
						return false;
					}
					delete webhookData.webhookId;
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();

		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
	}
}
