import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function createCharge(this: IExecuteFunctions, itemIndex: number) {
  const value = this.getNodeParameter('chargeValue', itemIndex) as number;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
    '',
  ) as string;

  const body: IDataObject = { value };

  if (correlationID) {
    body.correlationID = correlationID;
  }

  return apiRequest.call(this, 'POST', '/charge', body);
}
