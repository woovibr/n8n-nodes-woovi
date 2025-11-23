import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getQrCodeStatic(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const qrCodeId = this.getNodeParameter('qrCodeId', itemIndex) as string;

  if (!qrCodeId) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo qrCodeId é obrigatório',
    );
  }

  return await apiRequest.call(
    this,
    'GET',
    `/qrcode-static/${encodeURIComponent(qrCodeId)}`,
  );
}
