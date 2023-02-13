import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeApiError, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from './transport';

export class Woovi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Woovi',
		name: 'woovi',
		icon: 'file:woovi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate Woovi workflow API',
		defaults: {
			name: 'Woovi',
		},
		inputs: ['main'],
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
		properties: [
			{
				displayName: 'Value',
				name: 'chargeValue',
				type: 'number',
				default: '',
				placeholder: 'charge value into cents',
				description: 'ChargeValue into cents',
			},
			{
				displayName: 'CorrelationID',
				name: 'correlationID',
				type: 'string',
				default: '',
				placeholder: 'correlationID',
				description: 'Unique identifier for the charge',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let operationResult: INodeExecutionData[];

		const body = {
			value: this.getNodeParameter('chargeValue', 0),
			correlationID: this.getNodeParameter('correlationID', 0),
		} as IDataObject;

		let responseData;
		try {
			responseData = await apiRequest.call(this, 'POST', '/charge', body);
		} catch (error) {
			throw new NodeApiError(this.getNode(), error);
		}

		const executionData = this.helpers.constructExecutionMetaData(
			this.helpers.returnJsonArray(responseData),
			{itemData: {item: 1}},
		);

		operationResult = executionData;

		return [operationResult];
	}
}
