import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getChargeQrCodeImage(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const chargeId = this.getNodeParameter('id', itemIndex) as string;
  const size = this.getNodeParameter('size', itemIndex) as number | undefined;

  if (!chargeId) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "chargeId" é obrigatório',
      {
        itemIndex,
      },
    );
  }

  const params = new URLSearchParams();
  if (size) {
    params.append('size', String(size));
  }

  return apiRequest.call(
    this,
    'GET',
    `/openpix/charge/brcode/image/${encodeURIComponent(chargeId)}?${params.toString()}`,
    {},
    {},
    false,
  );
}
