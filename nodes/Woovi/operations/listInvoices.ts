import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

function isValidDateFormat(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

export async function listInvoices(this: IExecuteFunctions, itemIndex: number) {
  const limit = this.getNodeParameter('limit', itemIndex);
  const skip = this.getNodeParameter('skip', itemIndex);
  const start = this.getNodeParameter('start', itemIndex, '') as string;
  const end = this.getNodeParameter('end', itemIndex, '') as string;

  if (start && !isValidDateFormat(start)) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "Start Date" deve estar no formato YYYY-MM-DD (exemplo: 2021-01-01)',
      { itemIndex },
    );
  }

  if (end && !isValidDateFormat(end)) {
    throw new NodeOperationError(
      this.getNode(),
      'O campo "End Date" deve estar no formato YYYY-MM-DD (exemplo: 2021-12-31)',
      { itemIndex },
    );
  }

  const params = new URLSearchParams();
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  if (start) {
    params.append('start', start);
  }

  if (end) {
    params.append('end', end);
  }

  return apiRequest.call(this, 'GET', `/invoice?${params.toString()}`);
}
