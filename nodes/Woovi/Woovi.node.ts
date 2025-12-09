import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  INodeProperties,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { wooviOperations } from './operations';
import { wooviNodesProperties } from './properties';

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
          { name: 'Customer', value: 'customer' },
          { name: 'Refund', value: 'refund' },
          { name: 'Installment', value: 'installment' },
          { name: 'Invoice', value: 'invoice' },
          { name: 'Subscription', value: 'subscription' },
          { name: 'Pix Key', value: 'pixKey' },
          { name: 'QR Code Static', value: 'qrCodeStatic' },
          { name: 'Payment Request', value: 'payment' },
          { name: 'Psp (Payment Service Providers)', value: 'psp' },
          { name: 'Partner', value: 'partner' },
          { name: 'Webhook', value: 'webhook' },
          { name: 'Fraud Validation', value: 'fraudValidation' },
          { name: 'Transaction', value: 'transaction' },
          { name: 'Dispute', value: 'dispute' },
          { name: 'Account Register', value: 'accountRegister' },
          { name: 'Account', value: 'account' },
        ],
        default: 'charge',
      },
      ...wooviNodesProperties,
    ] as INodeProperties[],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const resource = this.getNodeParameter('resource', itemIndex) as string;
        const operation = this.getNodeParameter(
          'operation',
          itemIndex,
        ) as string;

        const handler = wooviOperations[resource]?.[operation];

        if (!handler) {
          throw new NodeApiError(this.getNode(), {
            message: `Unsupported resource/operation: ${resource}/${operation}`,
          });
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

        const errObj =
          error && typeof error === 'object' && 'message' in (error as any)
            ? { message: (error as any).message }
            : { message: String(error) };

        throw new NodeApiError(this.getNode(), errObj);
      }
    }

    return [returnData];
  }
}
