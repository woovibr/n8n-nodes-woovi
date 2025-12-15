import type { IExecuteFunctions } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function deleteApplication(
  this: IExecuteFunctions,
  _itemIndex: number,
) {
  const clientId = (this as any).getNodeParameter(
    'clientId',
    _itemIndex,
  ) as string;

  const body = {
    clientId,
  };

  return apiRequest.call(this, 'DELETE', '/application', body);
}
