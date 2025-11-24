import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createPayment(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const paymentType = this.getNodeParameter('paymentType', itemIndex) as string;
  const value = this.getNodeParameter('value', itemIndex) as number;
  const correlationID = this.getNodeParameter(
    'correlationID',
    itemIndex,
  ) as string;
  const pixKeyEndToEndId = this.getNodeParameter(
    'pixKeyEndToEndId',
    itemIndex,
    '',
  ) as string;
  const comment = this.getNodeParameter('comment', itemIndex, '') as string;
  const destinationAlias = this.getNodeParameter(
    'destinationAlias',
    itemIndex,
    '',
  ) as string;
  const destinationAliasType = this.getNodeParameter(
    'destinationAliasType',
    itemIndex,
    '',
  ) as string;
  let metadataParam = this.getNodeParameter('metadata', itemIndex, '') as
    | string
    | { [key: string]: any };
  let metadata: { [key: string]: any } | undefined = undefined;

  if (typeof metadataParam === 'string' && metadataParam.trim() !== '') {
    try {
      metadata = JSON.parse(metadataParam);
    } catch (err) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo metadata deve ser uma string JSON válida representando um objeto',
        );
    }
  } else if (typeof metadataParam === 'object' && metadataParam !== null) {
    metadata = metadataParam;
  }

  if (!paymentType) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo paymentType é obrigatório',
    );
  }

  if (value === undefined || value === null) {
    throw new NodeOperationError(this.getNode(), 'O campo value é obrigatório');
  }

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo correlationID é obrigatório',
    );
  }

  // (max 30 keys)
  if (metadata && typeof metadata === 'object') {
    const keys = Object.keys(metadata);
    if (keys.length > 30) {
      throw new NodeOperationError(
        this.getNode(),
        `O objeto metadata pode conter no máximo 30 chaves. Recebido: ${keys.length}.`,
      );
    }
  }

  const body: { [key: string]: any } = {
    type: paymentType,
    value,
    correlationID,
  };

  if (pixKeyEndToEndId) body.pixKeyEndToEndId = pixKeyEndToEndId;
  if (comment) body.comment = comment;
  if (destinationAlias) body.destinationAlias = destinationAlias;
  if (destinationAliasType) body.destinationAliasType = destinationAliasType;
  if (metadata && Object.keys(metadata).length) body.metadata = metadata;

  return await apiRequest.call(this, 'POST', '/payment', body);
}
