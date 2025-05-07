import {
  INodeTypes,
  WebhookSetupMethodNames,
  Workflow,
  IWebhookData,
  WorkflowExecuteMode,
  WorkflowActivateMode,
} from 'n8n-workflow';

import {
  HookContext,
} from 'n8n-core';

interface WebhookMethodError extends Error {
  nodeType?: string;
  methodName?: string;
}

export const runWebhookMethod = async (
  nodeTypes: INodeTypes,
  method: WebhookSetupMethodNames,
  workflow: Workflow,
  webhookData: IWebhookData,
  mode: WorkflowExecuteMode,
  activation: WorkflowActivateMode,
): Promise<boolean> => {
  const node = workflow.getNode(webhookData.node);

  if (!node) {
    throw new Error(`Node "${webhookData.node}" not found in workflow`);
  }

  const nodeType = nodeTypes.getByNameAndVersion(node.type, node.typeVersion);

  if (!nodeType) {
    throw new Error(`Node type "${node.type}" not found`);
  }

  const webhookFn = nodeType.webhookMethods?.[webhookData.webhookDescription.name]?.[method];

  if (!webhookFn) {
    const error: WebhookMethodError = new Error(
      `Webhook method "${method}" not found for node "${node.type}"`
    );
    error.nodeType = node.type;
    error.methodName = method;
    throw error;
  }

  const context = new HookContext(
    workflow,
    node,
    webhookData.workflowExecuteAdditionalData,
    mode,
    activation,
    webhookData,
  );

  const result = await webhookFn.call(context);

  if (typeof result !== 'boolean') {
    throw new Error(`Webhook method "${method}" returned invalid result type`);
  }

  return result;
};
