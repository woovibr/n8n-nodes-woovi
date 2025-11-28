import type {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class WooviApi implements ICredentialType {
  name = 'wooviApi';
  displayName = 'Woovi API';
  // Uses the link to this tutorial as an example
  // Replace with your own docs links when building your own nodes
  documentationUrl =
    'https://developers.woovi.com/docs/apis/api-getting-started';
  properties: INodeProperties[] = [
    {
      displayName: 'Use Sandbox Environment',
      name: 'useSandbox',
      type: 'boolean',
      default: false,
      description:
        'Ative para usar o ambiente de teste. Mais info: https://developers.woovi.com/docs/category/ambiente-de-teste. Para obter o token do sandbox acesse: https://app.woovi-sandbox.com/home/applications/tab/list',
    },
    {
      displayName: 'API Key (Production)',
      name: 'Authorization',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      displayOptions: {
        show: {
          useSandbox: [false],
        },
      },
    },
    {
      displayName: 'API Key (Sandbox)',
      name: 'sandboxAuthorization',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      displayOptions: {
        show: {
          useSandbox: [true],
        },
      },
    },
    {
      displayName: 'Base URL (Production)',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.woovi.com/api',
      displayOptions: {
        show: {
          useSandbox: [false],
        },
      },
    },
    {
      displayName: 'Base URL (Sandbox)',
      name: 'baseUrlSandbox',
      type: 'string',
      default: 'https://api.woovi-sandbox.com/api',
      displayOptions: {
        show: {
          useSandbox: [true],
        },
      },
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization:
          '={{ $credentials.useSandbox ? $credentials.sandboxAuthorization : $credentials.Authorization }}',
      },
    },
  };
}
