import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function uploadDisputeEvidence(
  this: IExecuteFunctions,
  itemIndex: number,
) {
  const id = this.getNodeParameter('id', itemIndex) as string;
  const docs = this.getNodeParameter('documents', itemIndex, []) as {
    document: { url: string; correlationID?: string; description?: string };
  }[];

  if (!id) {
    throw new NodeOperationError(this.getNode(), 'The field "id" is required', {
      itemIndex,
    });
  }

  if (!Array.isArray(docs)) {
    throw new NodeOperationError(
      this.getNode(),
      'The "documents" field must be an array',
      {
        itemIndex,
      },
    );
  }

  const documents = docs.map((d) => ({
    url: d.document?.url || '',
    correlationID: d.document?.correlationID || undefined,
    description: d.document?.description || undefined,
  }));

  const body = { documents };

  return apiRequest.call(
    this,
    'POST',
    `/dispute/${encodeURIComponent(id)}/evidence`,
    body,
  );
}

export default uploadDisputeEvidence;
