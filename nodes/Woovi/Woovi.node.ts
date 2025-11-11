import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { wooviOperations } from './operations';

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
          {
            name: 'Transfer between Subaccounts',
            value: 'transferSubaccounts',
          },
          {
            name: 'List Customers',
            value: 'listCustomers',
          },
          {
            name: 'Get Customer',
            value: 'getCustomer',
          },
          {
            name: 'Create Customer',
            value: 'createCustomer',
          },
          {
            name: 'Update Customer',
            value: 'updateCustomer',
          },
          { name: 'List Refunds', value: 'listRefunds' },
          { name: 'Get Refund', value: 'getRefund' },
          { name: 'Create Refund', value: 'createRefund' },
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
            resource: ['charge', 'subaccount', 'customer'],
            operation: ['create', 'transferSubaccounts', 'updateCustomer'],
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
            operation: [
              'getSubaccount',
              'withdrawSubaccount',
              'debitSubaccount',
              'deleteSubaccount',
            ],
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
            operation: [
              'withdrawSubaccount',
              'debitSubaccount',
              'transferSubaccounts',
            ],
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
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'taxID',
        name: 'taxID',
        type: 'string',
        default: '',
        description: 'Tax ID of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Email of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'collection',
        default: {
          zipcode: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          country: '',
          complement: '',
        },
        options: [
          {
            displayName: 'Zipcode',
            name: 'zipcode',
            type: 'string',
            default: '',
            description: 'Postal code',
          },
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
            description: 'Street name',
          },
          {
            displayName: 'Number',
            name: 'number',
            type: 'string',
            default: '',
            description: 'Street number',
          },
          {
            displayName: 'Neighborhood',
            name: 'neighborhood',
            type: 'string',
            default: '',
            description: 'Neighborhood/District',
          },
          {
            displayName: 'City',
            name: 'city',
            type: 'string',
            default: '',
            description: 'City name',
          },
          {
            displayName: 'State',
            name: 'state',
            type: 'string',
            default: '',
            description: 'State/Province',
          },
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: '',
            description: 'Country',
          },
          {
            displayName: 'Complement',
            name: 'complement',
            type: 'string',
            default: '',
            description: 'Additional address information (optional)',
          },
        ],
        description:
          'Address is optional, but if provided, all fields except complement must be filled',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['createCustomer', 'updateCustomer'],
          },
        },
      },
      {
        displayName: 'Id: Correlation ID or Tax ID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'Correlation ID or Tax ID of the customer',
        displayOptions: {
          show: {
            resource: ['customer'],
            operation: ['getCustomer'],
          },
        },
      },
      {
        displayName: 'Id: CorrelationID or RefundID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'CorrelationID or RefundID of the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['getRefund'],
          },
        },
      },
      {
        displayName: 'value',
        name: 'value',
        type: 'number',
        default: '',
        placeholder: 'refund value into cents',
        description: 'Refund value into cents',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Transaction End To End ID',
        name: 'transactionEndToEndId',
        type: 'string',
        default: '',
        placeholder: 'transaction end to end id',
        description:
          'Your transaction ID, or endToEnd ID, to keep track of this refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Correlation ID',
        name: 'correlationID',
        type: 'string',
        default: '',
        placeholder: 'correlationID',
        description: 'Unique identifier for the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Refund comment',
        name: 'comment',
        type: 'string',
        default: '',
        placeholder: 'comment',
        description: 'Comment for the refund',
        displayOptions: {
          show: {
            resource: ['refund'],
            operation: ['createRefund'],
          },
        },
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 20,
        placeholder: '20',
        description: 'Number of items to return',
        displayOptions: {
          show: {
            resource: ['customer', 'refund'],
            operation: ['listCustomers', 'listRefunds'],
          },
        },
      },
      {
        displayName: 'Skip',
        name: 'skip',
        type: 'number',
        default: 0,
        placeholder: '0',
        description: 'Number of items to skip',
        displayOptions: {
          show: {
            resource: ['customer', 'refund'],
            operation: ['listCustomers', 'listRefunds'],
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
