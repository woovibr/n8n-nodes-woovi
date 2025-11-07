import type {IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription,} from 'n8n-workflow';
import {NodeApiError} from 'n8n-workflow';

import {wooviOperations} from './operations';

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
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const resource = this.getNodeParameter('resource', itemIndex) as string;
        const operation = this.getNodeParameter('operation', itemIndex) as string;

        const handler = wooviOperations[resource]?.[operation];

        if (!handler) {
          throw new NodeApiError(this.getNode(), { message: `Unsupported resource/operation: ${resource}/${operation}` });
        }

        const responseData = await handler.call(this, itemIndex);

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: itemIndex } },
        );

        returnData.push(...executionData);
      } catch (error) {
        if (error instanceof NodeApiError) {
          throw error;
        }

        const errObj = (error && typeof error === 'object' && 'message' in (error as any))
          ? { message: (error as any).message }
          : { message: String(error) };

        throw new NodeApiError(this.getNode(), errObj);
      }
    }

    return [returnData];
  }
}
