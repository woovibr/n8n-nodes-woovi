import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription, IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';
import * as events from 'node:events';

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
    inputs: `={{main}}`,
    inputNames: [],
    outputs: `={{main}}`,
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
    webhooks: [
      {
        name: 'default',
        httpMethod: 'GET',
        responseMode: 'onReceived',
        path: 'webhook',
        nodeType: 'webhook'
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
          'The event to listen to. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
          loadOptionsMethod: 'getEvents',
        },
        options: [],
      },
    ],
  };

  methods = {
    loadOptions: {
      // Get all the events types to display them to user so that he can select them easily
      async getEvents(
        this: ILoadOptionsFunctions,
      ): Promise<INodePropertyOptions[]> {
        const events = [
          {
            name: 'OPENPIX:CHARGE_CREATED',
            value: 'OPENPIX:CHARGE_CREATED',
            description: 'New charge created',
          },
          {
            name: 'OPENPIX:CHARGE_COMPLETED',
            value: 'OPENPIX:CHARGE_COMPLETED',
            description: 'Charge completed is when a charge is fully paid',
          },
          {
            name: 'OPENPIX:CHARGE_EXPIRED',
            value: 'OPENPIX:CHARGE_EXPIRED',
            description:
              'Charge expired is when a charge is not fully paid and expired',
          },
          {
            name: 'OPENPIX:TRANSACTION_RECEIVED',
            value: 'OPENPIX:TRANSACTION_RECEIVED',
            description: 'New PIX transaction received',
          },
          {
            name: 'OPENPIX:TRANSACTION_REFUND_RECEIVED',
            value: 'OPENPIX:TRANSACTION_REFUND_RECEIVED',
            description: 'New PIX transaction refund received or refunded',
          },
          {
            name: 'OPENPIX:MOVEMENT_CONFIRMED',
            value: 'OPENPIX:MOVEMENT_CONFIRMED',
            description:
              'Payment confirmed is when the pix transaction related to the payment gets confirmed',
          },
          {
            name: 'OPENPIX:MOVEMENT_FAILED',
            value: 'OPENPIX:MOVEMENT_FAILED',
            description:
              'Payment failed is when the payment gets approved and a error occurs',
          },
          {
            name: 'OPENPIX:MOVEMENT_REMOVED',
            value: 'OPENPIX:MOVEMENT_REMOVED',
            description: 'Payment was removed by a user',
          },
          {
            name: 'ALL',
            value: 'ALL',
            description: 'Handle on all events',
          },
        ];

        return events.map((event) => {
          const node: INodePropertyOptions = {
            name: event.name,
            value: event.value!,
            description: event.description,
          };
          return node;
        });
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
