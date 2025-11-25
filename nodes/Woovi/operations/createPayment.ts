import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function createPayment(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<any> {
  const paymentType = this.getNodeParameter('paymentType', itemIndex) as string;
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

  if (!correlationID) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo correlationID é obrigatório',
    );
  }

  const typeSpecific: { [k: string]: any } = {};
  let value: number | undefined;

  switch (paymentType) {
    case 'PIX_KEY': {
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

      if (!destinationAlias) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo destinationAlias é obrigatório para paymentType PIX_KEY',
        );
      }
      if (!destinationAliasType) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo destinationAliasType é obrigatório para paymentType PIX_KEY',
        );
      }
      typeSpecific.destinationAlias = destinationAlias;
      typeSpecific.destinationAliasType = destinationAliasType;
      break;
    }

    case 'QR_CODE': {
      const qrCode = this.getNodeParameter('qrCode', itemIndex, '') as string;
      if (!qrCode) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo qrCode é obrigatório para paymentType QR_CODE',
        );
      }
      typeSpecific.qrCode = qrCode;
      break;
    }

    case 'MANUAL': {
      const psp = this.getNodeParameter('psp', itemIndex, '') as string;
      const holder = this.getNodeParameter('holder', itemIndex, {}) as {
        [key: string]: any;
      };
      const account = this.getNodeParameter('account', itemIndex, {}) as {
        [key: string]: any;
      };

      if (!psp) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo psp é obrigatório para paymentType MANUAL',
        );
      }
      if (!holder || Object.keys(holder).length === 0) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo holder é obrigatório para paymentType MANUAL',
        );
      }
      if (!account || Object.keys(account).length === 0) {
        throw new NodeOperationError(
          this.getNode(),
          'O campo account é obrigatório para paymentType MANUAL',
        );
      }
      typeSpecific.psp = psp;
      typeSpecific.holder = holder;
      typeSpecific.account = account;
      break;
    }

    default:
      throw new NodeOperationError(
        this.getNode(),
        `Tipo de pagamento desconhecido: ${paymentType}`,
      );
  }

  if (paymentType !== 'QR_CODE') {
    value = this.getNodeParameter('value', itemIndex, undefined) as
      | number
      | undefined;

    if (!value) {
      throw new NodeOperationError(
        this.getNode(),
        'O campo value é obrigatório',
      );
    }
  }

  const body: { [key: string]: any } = {
    type: paymentType,
    correlationID,
    ...typeSpecific,
  };

  if (paymentType !== 'QR_CODE' && value) {
    body.value = value;
  }

  if (pixKeyEndToEndId) {
    body.pixKeyEndToEndId = pixKeyEndToEndId;
  }

  if (comment) {
    body.comment = comment;
  }

  if (metadata && Object.keys(metadata).length) {
    body.metadata = metadata;
  }

  return await apiRequest.call(this, 'POST', '/payment', body);
}
