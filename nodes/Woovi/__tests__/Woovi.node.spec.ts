import nock from 'nock';

import wooviWorkflow from './wooviWorkflow.json';
import { executeWorkflow } from '../../../test/executeWorkflow';
import { CredentialsHelper } from '../../../test/CredentialsHelper';
import { getNodeResultData } from '../../../test/getNodeResultData';

it('should create a charge', async () => {
  const apiResult = {
    charge: {
      customer: null,
      value: 1000,
      identifier: '12ffab389d6f4c21958e9b7f66201135',
      correlationID: '12345',
      paymentLinkID: '59f27317-9031-4f0c-9dae-66ebaf52413c',
      transactionID: '12ffab389d6f4c21958e9b7f66201135',
      status: 'ACTIVE',
      giftbackAppliedValue: 0,
      discount: 0,
      valueWithDiscount: 1000,
      expiresDate: '2023-04-24T15:39:47.737Z',
      type: 'DYNAMIC',
      createdAt: '2023-03-25T15:39:47.737Z',
      additionalInfo: [],
      updatedAt: '2023-03-25T15:39:47.737Z',
      brCode:
        '000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A',
      expiresIn: 2592000,
      pixKey: '2424e46d-ca26-44c4-8c87-b965b3f536d1',
      paymentLinkUrl:
        'https://openpix.com.br/pay/59f27317-9031-4f0c-9dae-66ebaf52413c',
      qrCodeImage:
        'https://api.openpix.com.br/openpix/charge/brcode/image/59f27317-9031-4f0c-9dae-66ebaf52413c.png',
      globalID: 'Q2hhcmdlOjY0MWYxNWMzODQyZjNlNDczODY3NTE5MA==',
    },
    correlationID: '12345',
    brCode:
      '000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A',
  };

  const scope = nock('https://api.woovi.com/api')
    .post('/v1/charge', {
      value: 1000,
      correlationID: '12345',
    })
    .matchHeader('Authorization', 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS')
    .reply(200, apiResult);

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { waitPromise } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviWorkflow,
  });

  const result = await waitPromise.promise();

  const nodeResults = getNodeResultData(result, 'Woovi');

  expect(nodeResults.length).toBe(1);

  const [nodeResult] = nodeResults;

  expect(nodeResult.executionStatus).toBe('success');

  const data = nodeResult.data?.main[0]?.[0].json;

  expect(data).toEqual(apiResult);

  expect(scope.isDone()).toBe(true);
});

it('should create a charge with custom baseURL', async () => {
  const apiResult = {
    charge: {
      customer: null,
      value: 1000,
      identifier: '12ffab389d6f4c21958e9b7f66201135',
      correlationID: '12345',
      paymentLinkID: '59f27317-9031-4f0c-9dae-66ebaf52413c',
      transactionID: '12ffab389d6f4c21958e9b7f66201135',
      status: 'ACTIVE',
      giftbackAppliedValue: 0,
      discount: 0,
      valueWithDiscount: 1000,
      expiresDate: '2023-04-24T15:39:47.737Z',
      type: 'DYNAMIC',
      createdAt: '2023-03-25T15:39:47.737Z',
      additionalInfo: [],
      updatedAt: '2023-03-25T15:39:47.737Z',
      brCode:
        '000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A',
      expiresIn: 2592000,
      pixKey: '2424e46d-ca26-44c4-8c87-b965b3f536d1',
      paymentLinkUrl:
        'https://openpix.com.br/pay/59f27317-9031-4f0c-9dae-66ebaf52413c',
      qrCodeImage:
        'https://api.openpix.com.br/openpix/charge/brcode/image/59f27317-9031-4f0c-9dae-66ebaf52413c.png',
      globalID: 'Q2hhcmdlOjY0MWYxNWMzODQyZjNlNDczODY3NTE5MA==',
    },
    correlationID: '12345',
    brCode:
      '000201010212261030014br.gov.bcb.pix2581api.openpix.com.br/openpix/testing?transactionID=12ffab389d6f4c21958e9b7f66201135520400005303986540510.005802BR59136009Sao_Paulo6229052512ffab389d6f4c21958e9b7f663045C2A',
  };

  const scope = nock('https://api.woovi.com/custom/api')
    .post('/v1/charge', {
      value: 1000,
      correlationID: '12345',
    })
    .matchHeader('Authorization', 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS')
    .reply(200, apiResult);

  const credentialsHelper = new CredentialsHelper({
    wooviApi: {
      baseUrl: 'https://api.woovi.com/custom/api',
      Authorization: 'Q2xpZW50X0lkXzZjYjMzMTQ4LTNmZDQtNGI5MS',
    },
  });

  const { waitPromise } = await executeWorkflow({
    credentialsHelper,
    workflow: wooviWorkflow,
  });

  const result = await waitPromise.promise();

  const nodeResults = getNodeResultData(result, 'Woovi');

  expect(nodeResults.length).toBe(1);

  const [nodeResult] = nodeResults;

  expect(nodeResult.executionStatus).toBe('success');

  const data = nodeResult.data?.main[0]?.[0].json;

  expect(data).toEqual(apiResult);

  expect(scope.isDone()).toBe(true);
});
