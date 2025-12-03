import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getChargeQrCodeImage(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const chargeId = this.getNodeParameter('chargeId', itemIndex) as string;
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

  const qs = size ? `?size=${encodeURIComponent(String(size))}` : '';

  return apiRequest.call(
    this,
    'GET',
    `/openpix/charge/brcode/image/${encodeURIComponent(chargeId)}.png${qs}`,
  );
}
