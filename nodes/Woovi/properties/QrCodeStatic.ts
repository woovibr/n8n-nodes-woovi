import type { INodeProperties } from 'n8n-workflow';

export const qrCodeStaticProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
      },
    },
    options: [
      {
        name: 'Get QR Code',
        value: 'get',
        description: 'Get a static Pix QR code by ID',
        action: 'Get a static qr code',
      },
      {
        name: 'List QR Codes',
        value: 'list',
        description: 'List all static Pix QR codes',
        action: 'List static qr codes',
      },
    ],
    default: 'get',
  },
  {
    displayName: 'QR Code ID',
    name: 'qrCodeId',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'QR Code ID, Correlation ID, or Identifier',
    description: 'The ID, correlation ID, or identifier of the QR code',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['get'],
      },
    },
  },
];
