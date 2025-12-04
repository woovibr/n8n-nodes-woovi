import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getQrCodeBase64(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('id', itemIndex) as string;
  const size = this.getNodeParameter('size', itemIndex, undefined) as
    | number
    | undefined;

  if (!id) {
    throw new NodeOperationError(this.getNode(), 'The field "id" is required', {
      itemIndex,
    });
  }

  const params = new URLSearchParams();
  params.append('size', String(size));

  return apiRequest.call(
    this,
    'GET',
    `/image/qrcode/base64/${id}?${params.toString()}`,
    {},
    {},
    false,
  );
}
