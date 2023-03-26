import {
  createDeferredPromise,
  ICredentialsHelper,
  IExecuteWorkflowInfo,
  IRun,
  ITaskData,
  IWorkflowBase,
  IWorkflowExecuteAdditionalData,
  IWorkflowExecuteHooks,
  LoggerProxy,
  Workflow,
  WorkflowHooks,
} from 'n8n-workflow';
import { WorkflowExecute } from 'n8n-core';
import { nodeTypes } from './NodeTypesClass';

export type ExecuteWorkflowArgs = {
  workflow: any;
  credentialsHelper: ICredentialsHelper;
};

export const executeWorkflow = async ({
  credentialsHelper,
  ...args
}: ExecuteWorkflowArgs) => {
  LoggerProxy.init({
    debug() {},
    error() {},
    info() {},
    log() {},
    verbose() {},
    warn() {},
  });

  const workflow = new Workflow({
    id: 'test',
    active: true,
    connections: args.workflow.connections,
    nodes: args.workflow.nodes as any,
    nodeTypes,
  });

  const waitPromise = await createDeferredPromise<IRun>();
  const nodeExecutionOrder: string[] = [];

  const hookFunctions = {
    nodeExecuteAfter: [
      async (nodeName: string, data: ITaskData): Promise<void> => {
        nodeExecutionOrder.push(nodeName);
      },
    ],
    workflowExecuteAfter: [
      async (fullRunData: IRun): Promise<void> => {
        waitPromise.resolve(fullRunData);
      },
    ],
  } satisfies IWorkflowExecuteHooks;

  const workflowData: IWorkflowBase = {
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true,
    nodes: [],
    connections: {},
  };

  const additionalData: IWorkflowExecuteAdditionalData = {
    credentialsHelper,
    hooks: new WorkflowHooks(hookFunctions, 'trigger', '1', workflowData),
    executeWorkflow: async (
      workflowInfo: IExecuteWorkflowInfo,
    ): Promise<any> => {},
    sendMessageToUI: (message: string) => {},
    restApiUrl: '',
    encryptionKey: 'test',
    timezone: 'America/New_York',
    webhookBaseUrl: 'webhook',
    webhookWaitingBaseUrl: 'webhook-waiting',
    webhookTestBaseUrl: 'https://localhost:80',
    userId: '123',
  };

  const workflowExecute = new WorkflowExecute(additionalData, 'cli');

  const executionData = await workflowExecute.run(workflow);

  return {
    workflow,
    waitPromise,
    executionData,
    additionalData,
  };
};
