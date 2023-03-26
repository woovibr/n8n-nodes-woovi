import {
  IWorkflowExecuteAdditionalData,
  NodeHelpers,
  WebhookSetupMethodNames,
  Workflow,
} from 'n8n-workflow';
import { NodeExecuteFunctions } from 'n8n-core';

export const runWebhookMethod = async (
  workflow: Workflow,
  additionalData: IWorkflowExecuteAdditionalData,
  method: WebhookSetupMethodNames,
) => {
  const [webhookNode] = NodeHelpers.getNodeWebhooks(
    workflow,
    Object.values(workflow.nodes)[0],
    additionalData,
  );

  const result = await workflow.runWebhookMethod(
    method,
    webhookNode,
    NodeExecuteFunctions,
    'manual',
    'manual',
    true,
  );

  return result;
};
