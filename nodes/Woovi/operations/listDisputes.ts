import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

function isValidRFC3339(date: string): boolean {
  const rfc3339 =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!rfc3339.test(date)) return false;
  const parsed = Date.parse(date);
  return !Number.isNaN(parsed);
}

export async function listDisputes(this: IExecuteFunctions, itemIndex: number) {
  const start = this.getNodeParameter('start', itemIndex) as string | undefined;
  const end = this.getNodeParameter('end', itemIndex) as string | undefined;

  if (start && !isValidRFC3339(start)) {
    throw new NodeOperationError(
      this.getNode(),
      'The "start" field must be a valid RFC3339 date-time (example: 2020-01-01T00:00:00Z)',
    );
  }
  if (end && !isValidRFC3339(end)) {
    throw new NodeOperationError(
      this.getNode(),
      'The "end" field must be a valid RFC3339 date-time (example: 2020-12-01T17:00:00Z)',
    );
  }
  if (start && end) {
    const startDate = Date.parse(start);
    const endDate = Date.parse(end);
    if (startDate > endDate) {
      throw new NodeOperationError(
        this.getNode(),
        'The "start" date must be before or equal to the "end" date',
      );
    }
  }

  const qs: { start?: string; end?: string } = {};
  if (start) qs.start = start;
  if (end) qs.end = end;

  return apiRequest.call(this, 'GET', `/dispute`, {}, qs, true);
}

export default listDisputes;
