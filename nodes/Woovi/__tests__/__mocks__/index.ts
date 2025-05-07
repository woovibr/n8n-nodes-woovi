import mock from "jest-mock-extended/lib/Mock";
import {IConnections, NodeConnectionType, WorkflowTestData} from "n8n-workflow";

export const wooviWorkflow = {
  description: "My workflow",
  input: {
    workflowData: {
      nodes: [
        {
          id: "44ebe8c5-2062-40b5-833c-381d04ee9e99",
          name: "Woovi",
          typeVersion: 1,
          type: "n8n-nodes-woovi.woovi",
          position: [700, 360] as [number, number],
          parameters: {
            chargeValue: 1000,
            correlationID: "12345"
          },
          credentials: {
            wooviApi: {
              id: "1",
              name: "Woovi account"
            }
          }
        }
      ],
      connections: {
        "When clicking \"Execute Workflow\"": {
          main: [
            [
              {
                node: "Woovi",
                type: "main" as NodeConnectionType,
                index: 0
              }
            ]
          ]
        }
      },
    },
  },
  output: {
    nodeData: {
      "test": [[]] as never[][],
    },
  },
  credentials: {}
}

export const chargeResult = {"charge":{"customer":null,"value":1000,"identifier":"12ffab389d6f4c21958e9b7f66201135","correlationID":"12345","paymentLinkID":"59f27317-9031-4f0c-9dae-66ebaf52413c","transactionID":"12ffab389d6f4c21958e9b7f66201135","status":"ACTIVE","giftbackAppliedValue":0,"discount":0,"valueWithDiscount":1000,"expiresDate":"2023-04-24T15:39:47.737Z","type":"DYNAMIC","createdAt":"2023-03-25T15:39:47.737Z","additionalInfo":[],"updatedAt":"2023-03-25T15:39:47.737Z","brCode":"000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A","expiresIn":2592000,"pixKey":"2424e46d-ca26-44c4-8c87-b965b3f536d1","paymentLinkUrl":"https://openpix.com.br/pay/59f27317-9031-4f0c-9dae-66ebaf52413c","qrCodeImage":"https://api.openpix.com.br/openpix/charge/brcode/image/59f27317-9031-4f0c-9dae-66ebaf52413c.png","globalID":"Q2hhcmdlOjY0MWYxNWMzODQyZjNlNDczODY3NTE5MA=="},"correlationID":"12345","brCode":"000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A"}

export const chargeWithCustomBaseUrlResult = {"charge":{"customer":null,"value":1000,"identifier":"12ffab389d6f4c21958e9b7f66201135","correlationID":"12345","paymentLinkID":"59f27317-9031-4f0c-9dae-66ebaf52413c","transactionID":"12ffab389d6f4c21958e9b7f66201135","status":"ACTIVE","giftbackAppliedValue":0,"discount":0,"valueWithDiscount":1000,"expiresDate":"2023-04-24T15:39:47.737Z","type":"DYNAMIC","createdAt":"2023-03-25T15:39:47.737Z","additionalInfo":[],"updatedAt":"2023-03-25T15:39:47.737Z","brCode":"000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A","expiresIn":2592000,"pixKey":"2424e46d-ca26-44c4-8c87-b965b3f536d1","paymentLinkUrl":"https://openpix.com.br/pay/59f27317-9031-4f0c-9dae-66ebaf52413c","qrCodeImage":"https://api.openpix.com.br/openpix/charge/brcode/image/59f27317-9031-4f0c-9dae-66ebaf52413c.png","globalID":"Q2hhcmdlOjY0MWYxNWMzODQyZjNlNDczODY3NTE5MA=="},"correlationID":"12345","brCode":"000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A"}

export const connections: IConnections = mock<IConnections>()

export const workflowWithoutValue: WorkflowTestData = {
  ...wooviWorkflow,
  input: {
    workflowData: {
      nodes: [{
        ...wooviWorkflow.input.workflowData.nodes[0],
        parameters: {
          correlationID: "12345"
          // chargeValue removed
        }
      }],
      connections
    }
  }
};
