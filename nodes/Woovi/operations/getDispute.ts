import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getDispute(this: IExecuteFunctions, itemIndex: number) {
  const id = this.getNodeParameter('id', itemIndex) as string;
  if (!id) {
    throw new NodeOperationError(this.getNode(), 'The field "id" is required', {
      itemIndex,
    });
  }

  return apiRequest.call(this, 'GET', `/dispute/${encodeURIComponent(id)}`);
}

export default getDispute;
