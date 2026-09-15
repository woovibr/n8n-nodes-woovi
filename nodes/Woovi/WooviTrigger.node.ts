import {
  IHookFunctions,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from 'n8n-workflow';

import { apiRequest } from './transport';
import {
  getRawBody,
  HMAC_SIGNATURE_HEADER,
  RSA_SIGNATURE_HEADER,
  verifyHmacSignature,
  verifyRsaSignature,
} from './verifySignature';

const ALL_EVENTS = 'ALL';

export class WooviTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Woovi Trigger',
    name: 'wooviTrigger',
    icon: 'file:woovi.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["events"]}}',
    description: 'Handle Woovi Events via Webhook',
    defaults: {
      name: 'Woovi Trigger',
    },
    inputs: [],
    inputNames: [],
    outputs: ['main'],
    outputNames: ['main'],
    credentials: [
      {
        name: 'wooviApi',
        required: false,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
        nodeType: 'webhook',
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
      {
        displayName: 'HMAC Secret Key',
        name: 'hmacSecretKey',
        type: 'string',
        default: '',
        typeOptions: {
          password: true,
        },
        description:
          'Secret of a webhook registered outside this node, used to verify the x-openpix-signature header. Leave empty when a Woovi API credential is set: the node then reads the secret from the webhook itself.',
      },
      {
        displayName: 'Webhook Public Key',
        name: 'webhookPublicKey',
        type: 'string',
        default: '',
        typeOptions: {
          password: true,
        },
        description:
          'Woovi public key, used to verify the x-webhook-signature header when no HMAC secret is available',
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

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default');
        const webhookData = this.getWorkflowStaticData('node');

        let result;

        try {
          result = await apiRequest.call(
            this,
            'GET',
            '/webhook',
            {},
            {
              url: webhookUrl,
            },
          );
        } catch (error) {
          return true;
        }

        const [webhook] = result.webhooks ?? [];

        if (!webhook) {
          return false;
        }

        webhookData.hmacSecretKey = webhook.hmacSecretKey;

        return true;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const event = this.getNodeParameter('events', '') as string;

        if (!event || event === ALL_EVENTS) {
          return true;
        }

        const webhookUrl = this.getNodeWebhookUrl('default');
        const webhookData = this.getWorkflowStaticData('node');

        let result;

        try {
          result = await apiRequest.call(this, 'POST', '/webhook', {
            webhook: {
              name: 'N8N Webhook',
              url: webhookUrl,
              event,
              isActive: true,
            },
          });
        } catch (error) {
          return true;
        }

        const { webhook } = result;

        if (!webhook?.id) {
          return true;
        }

        webhookData.webhookId = webhook.id;
        webhookData.hmacSecretKey = webhook.hmacSecretKey;

        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');

        if (webhookData.webhookId) {
          try {
            await apiRequest.call(
              this,
              'DELETE',
              `/webhook/${webhookData.webhookId}`,
            );
          } catch (error) {
            return false;
          }

          delete webhookData.webhookId;
        }

        delete webhookData.hmacSecretKey;

        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const webhookData = this.getWorkflowStaticData('node');

    const hmacSecretKey =
      (webhookData.hmacSecretKey as string | undefined) ||
      (this.getNodeParameter('hmacSecretKey', '') as string);
    const publicKey = this.getNodeParameter('webhookPublicKey', '') as string;

    if (hmacSecretKey || publicKey) {
      const rawBody = getRawBody(req);
      const headers = req.headers as Record<string, string | undefined>;

      const isValid = hmacSecretKey
        ? verifyHmacSignature({
            hmacSecretKey,
            rawBody,
            signature: headers[HMAC_SIGNATURE_HEADER],
          })
        : verifyRsaSignature({
            publicKey,
            rawBody,
            signature: headers[RSA_SIGNATURE_HEADER],
          });

      if (!isValid) {
        return {
          webhookResponse: {
            statusCode: 401,
            body: {
              success: false,
              message: 'invalid webhook signature',
            },
          },
        };
      }
    }

    const configuredEvent = this.getNodeParameter('events') as string;
    const acceptedEvents = [ALL_EVENTS, configuredEvent];

    if (acceptedEvents.includes(req.body.event)) {
      return {
        workflowData: [[{ json: req.body }]],
        webhookResponse: {
          statusCode: 200,
          body: {
            success: true,
            message: `event ${req.body.event} received!`,
          },
        },
      };
    }
    return {
      webhookResponse: {
        statusCode: 422,
        body: {
          success: true,
          message: 'event type not accepted',
        },
      },
    };
  }
}
