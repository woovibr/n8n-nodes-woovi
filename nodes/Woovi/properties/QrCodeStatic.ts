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
        name: 'Create QR Code',
        value: 'create',
        description: 'Create a new static Pix QR code',
        action: 'Create a static qr code',
      },
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
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'my-qr-code',
    description: 'Name of this pix qrcode',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Value',
    name: 'value',
    type: 'number',
    required: true,
    default: 0,
    placeholder: '100',
    description: 'Value in cents of this qrcode',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Correlation ID',
    name: 'correlationID',
    type: 'string',
    default: '',
    placeholder: '9134e286-6f71-427a-bf00-241681624586',
    description: 'Your correlation ID to keep track of this qrcode',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    placeholder: 'Payment for service',
    description: 'Comment to be added in infoPagador',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Pix Key',
    name: 'pixKey',
    type: 'string',
    default: '',
    placeholder: '',
    description: 'The pix key that this qrcode is associated with',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['create'],
      },
    },
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
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    description: 'Maximum number of results to return',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Skip',
    name: 'skip',
    type: 'number',
    default: 0,
    description: 'Number of results to skip',
    displayOptions: {
      show: {
        resource: ['qrCodeStatic'],
        operation: ['list'],
      },
    },
  },
];
