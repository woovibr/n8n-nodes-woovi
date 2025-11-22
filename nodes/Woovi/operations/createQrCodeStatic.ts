import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createQrCodeStatic(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const name = this.getNodeParameter('name', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex) as number;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
    '',
  ) as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;
  const pixKey = this.getNodeParameter('pixKey', itemIndex, '') as string;

  if (!name) {
    throw new NodeOperationError(this.getNode(), 'O campo name é obrigatório', {
      itemIndex,
    });
  }

  if (!value) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo value é obrigatório',
      { itemIndex },
    );
  }

  const body: Record<string, any> = {
    name,
    value,
  };

  if (correlationID) {
    body.correlationID = correlationID;
  }

  if (comment) {
    body.comment = comment;
  }

  if (pixKey) {
    body.pixKey = pixKey;
  }

  return apiRequest.call(this, 'POST', '/qrcode-static', body);
}
