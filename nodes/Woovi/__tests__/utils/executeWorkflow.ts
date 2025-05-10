import path from 'node:path';
import {existsSync} from 'node:fs';
import callsites from 'callsites';
import {mock} from 'jest-mock-extended';

import {
    createDeferredPromise,
    Workflow,
    WorkflowTestData,
    IWorkflowBase,
    IRun,
    IRunExecutionData,
    IWorkflowExecuteAdditionalData,
    UnexpectedError,
} from 'n8n-workflow';

import {
    ExecutionLifecycleHooks,
    WorkflowExecute,
} from 'n8n-core';

import {LoadNodesAndCredentials} from '../../../../test/LoadNodesAndCredentials';
import {NodeTypes} from '../../../../test/NodeTypes';
import {CredentialTypes} from '../../../../test/CredentialTypes';
import {CredentialsHelper} from '../../../../test/CredentialsHelper';

export const executeWorkflow = async (testData: WorkflowTestData) => {

    const testDir: string = path.dirname(callsites()[1].getFileName()!);
    const packagePaths: string[] = [];
    packagePaths.unshift(packageDir(testDir));

    const loadNodesAndCredentials = new LoadNodesAndCredentials(packagePaths);
    await loadNodesAndCredentials.init();

    const credentialTypes = new CredentialTypes(loadNodesAndCredentials);
    const credentialsHelper = new CredentialsHelper(credentialTypes);
    credentialsHelper.setCredentials(testData.credentials!);

    const nodeTypes = new NodeTypes(loadNodesAndCredentials);

    const executionMode = testData.trigger?.mode ?? 'manual';
    const workflowData = testData.input.workflowData;
    const {connections, nodes, settings} = workflowData;
    const workflowInput = {
        id: 'test',
        nodes,
        connections,
        nodeTypes,
        settings,
        active: false,
    };
    const workflowInstance = new Workflow(workflowInput);

    const workflowBaseInput: IWorkflowBase = {
        id: '1',
        name: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        nodes: [],
        connections: {},
    };

    const hooks = new ExecutionLifecycleHooks('trigger', '1', workflowBaseInput);

    const nodeExecutionOrder: string[] = [];
    hooks.addHandler('nodeExecuteAfter', (nodeName) => {
        nodeExecutionOrder.push(nodeName);
    });

    const waitPromise = createDeferredPromise<IRun>();
    hooks.addHandler('workflowExecuteAfter', (fullRunData) => waitPromise.resolve(fullRunData));

    const additionalData = mock<IWorkflowExecuteAdditionalData>({
        hooks,
        // Get from node.parameters
        currentNodeParameters: undefined,
        webhookBaseUrl: 'https://api.woovi.com/api',
        webhookWaitingBaseUrl: 'webhook-waiting',
        webhookTestBaseUrl: 'https://api.woovi.com/api',
        userId: '123',
    });
    additionalData.credentialsHelper = credentialsHelper;
    additionalData.webhookBaseUrl = "https://api.woovi.com/api";

    let executionData: IRun;

    const runExecutionData: IRunExecutionData = {
        resultData: {
            runData: {},
        },
        executionData: {
            metadata: {},
            contextData: {},
            waitingExecution: {},
            waitingExecutionSource: null,
            nodeExecutionStack: [
                {
                    node: workflowInstance.getStartNode()!,
                    data: {
                        main: [[testData.trigger?.input ?? {json: {}}]],
                    },
                    source: null,
                },
            ],
        },
    };

    const workflowExecute = new WorkflowExecute(additionalData, executionMode, runExecutionData);
    executionData = await workflowExecute.processRunExecutionData(workflowInstance);

    const result = await waitPromise.promise;

    return {executionData, result, nodeExecutionOrder, workflowInstance, workflowData, nodeTypes, additionalData};
}

function packageDir(testDir: string) {
    let packageDir = testDir;
    while (packageDir !== '/') {
        if (existsSync(path.join(packageDir, 'package.json'))) break;
        packageDir = path.dirname(packageDir);
    }
    if (packageDir === '/') {
        throw new UnexpectedError('Invalid package');
    }
    return packageDir;
}
