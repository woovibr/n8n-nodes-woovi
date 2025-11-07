import type {IDataObject, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription,} from 'n8n-workflow';
import {NodeApiError} from 'n8n-workflow';
import {apiRequest} from './transport';

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
    inputNames: ['main'],
    outputs: ['main'],
    outputNames: ['main'],
    credentials: [
      {
        name: 'wooviApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.woovi.com/api',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'n8n',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          { name: 'Charge', value: 'charge' },
          { name: 'Subaccount', value: 'subaccount' },
        ],
        default: 'charge',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          { name: 'Create Charge', value: 'create' },
          { name: 'List Subaccounts', value: 'listSubaccounts' },
          { name: 'Get Subaccount', value: 'getSubaccount' },
          { name: 'Create/Retrieve Subaccount', value: 'createSubaccount' },
          { name: 'Withdraw from Subaccount', value: 'withdrawSubaccount' },
          { name: 'Debit Subaccount', value: 'debitSubaccount' },
          { name: 'Delete Subaccount', value: 'deleteSubaccount' },
          { name: 'Transfer between Subaccounts', value: 'transferSubaccounts' },
        ],
        default: 'create',
      },
      {
        displayName: 'Value',
        name: 'chargeValue',
        type: 'number',
        default: '',
        placeholder: 'charge value into cents',
        description: 'ChargeValue into cents',
        displayOptions: {
          show: {
            resource: ['charge'],
          },
        },
      },
      {
        displayName: 'CorrelationID',
        name: 'correlationID',
        type: 'string',
        default: '',
        placeholder: 'correlationID',
        description: 'Unique identifier for the charge',
        displayOptions: {
          show: {
            resource: ['charge', 'subaccount'],
            operation: ['create', 'transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'Subaccount ID',
        name: 'subaccountId',
        type: 'string',
        default: '',
        placeholder: 'subaccount id',
        description: 'Subaccount id (used by get/withdraw/debit/delete)',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['getSubaccount', 'withdrawSubaccount', 'debitSubaccount', 'deleteSubaccount'],
          },
        },
      },
      {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: 0,
        description: 'Amount in cents for withdraw/debit/transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['withdrawSubaccount', 'debitSubaccount', 'transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'Pix Key',
        name: 'subaccountPixKey',
        type: 'string',
        default: '',
        description: 'Pix key for create/retrieve subaccount',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['createSubaccount'],
          },
        },
      },
      {
        displayName: 'Subaccount Name',
        name: 'subaccountName',
        type: 'string',
        default: '',
        description: 'Friendly name for the subaccount',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['createSubaccount'],
          },
        },
      },
      {
        displayName: 'To Pix Key',
        name: 'toPixKey',
        type: 'string',
        default: '',
        description: 'Destination pix key for transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'From Pix Key',
        name: 'fromPixKey',
        type: 'string',
        default: '',
        description: 'Source pix key for transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['transferSubaccounts'],
          },
        },
      },
      {
        displayName: 'Description',
        name: 'operationDescription',
        type: 'string',
        default: '',
        description: 'Description for debit or transfer',
        displayOptions: {
          show: {
            resource: ['subaccount'],
            operation: ['debitSubaccount', 'transferSubaccounts'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    let operationResult: INodeExecutionData[];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    let responseData: any;
    try {
      if (resource === 'charge' && operation === 'create') {
        const body = {
          value: this.getNodeParameter('chargeValue', 0),
          correlationID: this.getNodeParameter('correlationID', 0),
        } as IDataObject;
        responseData = await apiRequest.call(this, 'POST', '/charge', body);
      } else if (resource === 'subaccount') {
        // Subaccount operations
        if (operation === 'listSubaccounts') {
          responseData = await apiRequest.call(this, 'GET', '/subaccount');
        } else if (operation === 'getSubaccount') {
          const id = this.getNodeParameter('subaccountId', 0) as string;
          responseData = await apiRequest.call(this, 'GET', `/subaccount/${id}`);
        } else if (operation === 'createSubaccount') {
          const pixKey = this.getNodeParameter('subaccountPixKey', 0) as string;
          const name = this.getNodeParameter('subaccountName', 0) as string || undefined;
          const body: IDataObject = {};
          if (pixKey) body.pixKey = pixKey;
          if (name) body.name = name;
          responseData = await apiRequest.call(this, 'POST', '/subaccount', body);
        } else if (operation === 'withdrawSubaccount') {
          const id = this.getNodeParameter('subaccountId', 0) as string;
          const value = this.getNodeParameter('amount', 0) as number;
          responseData = await apiRequest.call(this, 'POST', `/subaccount/${id}/withdraw`, { value });
        } else if (operation === 'debitSubaccount') {
          const id = this.getNodeParameter('subaccountId', 0) as string;
          const value = this.getNodeParameter('amount', 0) as number;
          const description = this.getNodeParameter('operationDescription', 0) as string || undefined;
          const body: IDataObject = { value };
          if (description) body.description = description;
          responseData = await apiRequest.call(this, 'POST', `/subaccount/${id}/debit`, body);
        } else if (operation === 'deleteSubaccount') {
          const id = this.getNodeParameter('subaccountId', 0) as string;
          responseData = await apiRequest.call(this, 'DELETE', `/subaccount/${id}`);
        } else if (operation === 'transferSubaccounts') {
          const value = this.getNodeParameter('amount', 0) as number;
          const fromPixKey = this.getNodeParameter('fromPixKey', 0) as string;
          const toPixKey = this.getNodeParameter('toPixKey', 0) as string;
          const correlationID = this.getNodeParameter('correlationID', 0, '') as string;
          const description = this.getNodeParameter('operationDescription', 0, '') as string;
          const body: IDataObject = { value };
          if (fromPixKey) body.fromPixKey = fromPixKey;
          if (toPixKey) body.toPixKey = toPixKey;
          if (correlationID) body.correlationID = correlationID;
          if (description) body.description = description;
          responseData = await apiRequest.call(this, 'POST', `/subaccount/transfer`, body);
        } else {
          throw new NodeApiError(this.getNode(), { message: `Unsupported subaccount operation: ${operation}` });
        }
      } else {
        throw new NodeApiError(this.getNode(), { message: `Unsupported resource/operation: ${resource}/${operation}` });
      }
    } catch (error) {
      // Normalize error to a JsonObject for NodeApiError
      const errObj = (error && typeof error === 'object' && 'message' in (error as any)) ? { message: (error as any).message } : { message: String(error) };
      throw new NodeApiError(this.getNode(), errObj);
    }

    operationResult = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData),
      {itemData: {item: 1}},
    );

    return [operationResult];
  }
}
