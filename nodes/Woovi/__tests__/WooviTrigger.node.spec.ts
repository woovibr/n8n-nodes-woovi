import nock from 'nock';
import {IWebhookData, NodeConnectionType, WorkflowTestData} from 'n8n-workflow';
import { executeWorkflow } from '../../../test/executeWorkflow';
import { runWebhookMethod } from '../../../test/runWebhookMethod';

describe('WooviTrigger Node', () => {
  const baseUrl = 'https://api.woovi.com/';
  const authToken = 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS';

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('webhook methods', () => {
    describe('checkExists', () => {
      test('should return false when no webhook exists', async () => {
        const scope = nock(baseUrl)
          .get(`/api/webhook`)
          .reply(200, {
            webhooks: [],
          });

        const authScope = nock(baseUrl)
          .get(`/api`)
          .reply(200, {
            webhooks: [],
          });

        const { workflowInstance, nodeTypes, additionalData } = await executeWorkflow({
          ...wooviTriggerWorkflow,
          credentials: {
            wooviApi: {
              baseUrl,
              Authorization: authToken,
            },
          },
        });

        const webhookData: IWebhookData = {
          node: 'Woovi Trigger',
          webhookDescription: {
            name: 'default',
            httpMethod: 'GET',
            path: `${baseUrl}/api/webhook`,
          },
          httpMethod: 'GET',
          path: `${baseUrl}/api/webhook`,
          workflowExecuteAdditionalData: additionalData,
          workflowId: workflowInstance.id,
        };

        const result = await runWebhookMethod(
          nodeTypes,
          'checkExists',
          workflowInstance,
          webhookData,
          'trigger',
          'activate'
        );

        expect(result).toBe(false);
        expect(scope.isDone()).toBe(true);
      });

      test('should return true when webhook exists', async () => {
        const scope = nock(baseUrl)
          .get('/api/webhook')
          .reply(200, {
            webhooks: [{
              id: 'existing-webhook-id',
              url: `${baseUrl}/webhook`,
            }],
          });

        const { workflowInstance, nodeTypes, additionalData } = await executeWorkflow({
          ...wooviTriggerWorkflow,
          credentials: {
            wooviApi: {
              baseUrl,
              Authorization: authToken,
            },
          },
        });

        const webhookData: IWebhookData = {
          node: 'Woovi Trigger',
          webhookDescription: {
            name: 'default',
            httpMethod: 'GET',
            path: `${baseUrl}/webhook`,
          },
          workflowExecuteAdditionalData: additionalData,
          workflowId: workflowInstance.id,
          httpMethod: 'GET',
          path: `${baseUrl}/webhook`,
        };

        const result = await runWebhookMethod(
          nodeTypes,
          'checkExists',
          workflowInstance,
          webhookData,
          'trigger',
          'activate'
        );

        expect(result).toBe(true);
        expect(scope.isDone()).toBe(true);
      });
    });

    describe('create', () => {
      test('should create webhook successfully', async () => {
        const scope = nock(baseUrl)
          .post('/webhook', {
            webhook: {
              name: 'N8N Webhook',
              url: `${baseUrl}/webhook`,
              event: ['OPENPIX:CHARGE_CREATED'],
              isActive: true,
            },
          })
          .reply(200, {
            webhook: {
              id: 'new-webhook-id',
            },
          });

        const { workflowInstance, nodeTypes, additionalData } = await executeWorkflow({
          ...wooviTriggerWorkflow,
          credentials: {
            wooviApi: {
              baseUrl,
              Authorization: authToken,
            },
          },
        });

        const webhookData: IWebhookData = {
          node: 'Woovi Trigger',
          webhookDescription: {
            name: 'default',
            httpMethod: 'GET',
            path: 'webhook',
          },
          workflowExecuteAdditionalData: additionalData,
          workflowId: workflowInstance.id,
          httpMethod: 'GET',
          path: 'webhook',
        };

        const result = await runWebhookMethod(
          nodeTypes,
          'create',
          workflowInstance,
          webhookData,
          'trigger',
          'activate'
        );

        expect(result).toBe(true);
        expect(scope.isDone()).toBe(true);
      });
    });
  });
});

const wooviTriggerWorkflow: WorkflowTestData = {
  description: 'Woovi Trigger workflow',
  input: {
    workflowData: {
      nodes: [
        {
          id: '48465b68-19d5-4784-9caf-07e6f2a37478',
          name: 'Woovi Trigger',
          typeVersion: 1,
          type: 'n8n-nodes-woovi.wooviTrigger',
          position: [620, 420],
          webhookId: 'webhook-test-id',
          parameters: {
            events: 'OPENPIX:CHARGE_CREATED',
          },
          credentials: {
            wooviApi: {
              id: '1',
              name: 'Woovi account',
            },
          },
        },
      ],
      connections: {},
    },
  },
  output: {
    nodeData: {
      test: [[]],
    },
  },
  credentials: {},
};
