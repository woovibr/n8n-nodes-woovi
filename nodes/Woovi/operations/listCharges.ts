import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';

function isValidRFC3339(date: string): boolean {
  // Basic RFC 3339 regex (accepts Z or offset +/-HH:MM with optional fractional seconds)
  const rfc3339 =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!rfc3339.test(date)) return false;
  const parsed = Date.parse(date);
  return !Number.isNaN(parsed);
}

export async function listCharges(this: IExecuteFunctions, itemIndex: number) {
  const start = this.getNodeParameter('start', itemIndex) as string | undefined;
  const end = this.getNodeParameter('end', itemIndex) as string | undefined;
  const status = this.getNodeParameter('status', itemIndex) as
    | string
    | undefined;
  const customer = this.getNodeParameter('customerCorrelationId', itemIndex) as
    | string
    | undefined;
  const subscription = this.getNodeParameter('subscription', itemIndex) as
    | string
    | undefined;
  const limit = this.getNodeParameter('limit', itemIndex) as number | undefined;
  const skip = this.getNodeParameter('skip', itemIndex) as number | undefined;

  const params = new URLSearchParams();
  // Validate date params (RFC3339)
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

  if (status && status !== 'ALL') {
    const allowed = ['ACTIVE', 'COMPLETED', 'EXPIRED'];
    if (!allowed.includes(status)) {
      throw new NodeOperationError(
        this.getNode(),
        `The status field must be one of: ${allowed.join(', ')}`,
      );
    }
  }
  if (start) params.append('start', start);
  if (end) params.append('end', end);
  if (status) params.append('status', status);
  if (customer) params.append('customer', customer);
  if (subscription) params.append('subscription', subscription);
  params.append('limit', String(limit ?? 20));
  params.append('skip', String(skip ?? 0));

  const query = params.toString();
  const endpoint = query ? `/charge?${query}` : '/charge';

  return apiRequest.call(this, 'GET', endpoint);
}
