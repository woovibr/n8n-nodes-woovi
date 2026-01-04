import type { INodeProperties } from 'n8n-workflow';

export const receiptProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: { resource: ['receipt'] } },
    options: [{ name: 'Get Receipt PDF', value: 'getReceiptPdf' }],
    default: 'getReceiptPdf',
  },
  {
    displayName: 'Receipt Type',
    name: 'receiptType',
    type: 'options',
    options: [
      { name: 'pix-in', value: 'pix-in' },
      { name: 'pix-out', value: 'pix-out' },
      { name: 'pix-refund', value: 'pix-refund' },
    ],
    default: 'pix-in',
    required: true,
    displayOptions: {
      show: { resource: ['receipt'], operation: ['getReceiptPdf'] },
    },
  },
  {
    displayName: 'EndToEndId',
    name: 'endToEndId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { resource: ['receipt'], operation: ['getReceiptPdf'] },
    },
  },
];
