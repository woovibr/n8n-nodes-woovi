import { Credentials } from 'n8n-core';
import {
  ICredentialDataDecryptedObject,
  ICredentialsHelper,
  IHttpRequestHelper,
  IHttpRequestOptions,
  INode,
  INodeCredentialsDetails,
} from 'n8n-workflow';

export class CredentialsHelper extends ICredentialsHelper {
  constructor(
    private credentials: Record<string, ICredentialDataDecryptedObject>,
  ) {
    super('');
  }

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    typeName: string,
    requestParams: IHttpRequestOptions,
  ): Promise<IHttpRequestOptions> {
    return requestParams;
  }

  async preAuthentication(
    helpers: IHttpRequestHelper,
    credentials: ICredentialDataDecryptedObject,
    typeName: string,
    node: INode,
    credentialsExpired: boolean,
  ): Promise<ICredentialDataDecryptedObject | undefined> {
    return undefined;
  }

  getParentTypes(name: string): string[] {
    return [];
  }

  async getDecrypted(
    nodeCredentials: INodeCredentialsDetails,
    type: string,
  ): Promise<ICredentialDataDecryptedObject> {
    return this.credentials[type];
  }

  async getCredentials(
    nodeCredentials: INodeCredentialsDetails,
    type: string,
  ): Promise<Credentials> {
    return new Credentials({ id: null, name: '' }, '', [], '');
  }

  async updateCredentials(
    nodeCredentials: INodeCredentialsDetails,
    type: string,
    data: ICredentialDataDecryptedObject,
  ): Promise<void> {}
}
