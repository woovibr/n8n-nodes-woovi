import type { INodeProperties } from 'n8n-workflow';

export const chargeProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['charge'],
      },
    },
    options: [
      { name: 'Create Charge', value: 'create' },
      { name: 'Get Charge', value: 'get' },
      { name: 'List Charges', value: 'list' },
      { name: 'List Refunds', value: 'listRefunds' },
      { name: 'Create Refund', value: 'createRefund' },
      { name: 'Update Expiration Date', value: 'updateChargeExpiration' },
      { name: 'Delete Charge', value: 'deleteCharge' },
      { name: 'Get QR Code Image', value: 'getQrImage' },
      { name: 'Get QR Code Base64', value: 'getQrImageBase64' },
    ],
    default: 'create',
  },
  // Get Charge fields
  {
    displayName: 'Charge ID',
    name: 'chargeId',
    type: 'string',
    required: true,
    default: '',
    description: 'Charge ID or correlation ID',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: [
          'get',
          'listRefunds',
          'createRefund',
          'updateChargeExpiration',
          'deleteCharge',
        ],
      },
    },
  },
  // List Charges fields
  {
    displayName: 'Start Date',
    name: 'start',
    type: 'string',
    default: '',
    placeholder: '2020-01-01T00:00:00Z',
    description: 'Start date used in the query (RFC 3339 format)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'End Date',
    name: 'end',
    type: 'string',
    default: '',
    placeholder: '2020-12-01T17:00:00Z',
    description: 'End date used in the query (RFC 3339 format)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    default: '',
    options: [
      { name: 'All', value: 'ALL' },
      { name: 'Active', value: 'ACTIVE' },
      { name: 'Completed', value: 'COMPLETED' },
      { name: 'Expired', value: 'EXPIRED' },
    ],
    description: 'Charge status filter',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Customer Correlation ID',
    name: 'customerCorrelationId',
    type: 'string',
    default: '',
    description: 'Customer correlation ID to filter by',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Subscription Correlation ID',
    name: 'subscription',
    type: 'string',
    default: '',
    description: 'Subscription correlation ID to filter by',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 20,
    placeholder: '20',
    description: 'Number of items to return',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Skip',
    name: 'skip',
    type: 'number',
    default: 0,
    placeholder: '0',
    description: 'Number of items to skip',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Value',
    name: 'chargeValue',
    type: 'number',
    required: true,
    default: '',
    placeholder: 'charge value into cents',
    description: 'ChargeValue into cents',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'CorrelationID',
    name: 'correlationID',
    type: 'string',
    default: '',
    placeholder: 'correlationID',
    description: 'Unique identifier for the charge',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    options: [
      { name: 'DYNAMIC', value: 'DYNAMIC' },
      { name: 'OVERDUE', value: 'OVERDUE' },
    ],
    default: 'DYNAMIC',
    description: 'Charge type to determine expiration behavior',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comment for the charge',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'ExpiresIn (seconds)',
    name: 'expiresIn',
    type: 'number',
    default: '',
    placeholder: '300',
    description: 'Expire time in seconds (minimum 5 minutes)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'ExpiresDate (ISO 8601)',
    name: 'expiresDate',
    type: 'string',
    default: '',
    placeholder: '2025-12-01T17:00:00Z',
    description: 'Expiration date in ISO 8601 format',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Return existing',
    name: 'returnExisting',
    type: 'boolean',
    default: false,
    description:
      'Return existing charge if correlationID already exists (idempotent)',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Customer',
    name: 'customer',
    type: 'collection',
    default: {
      name: '',
      email: '',
      phone: '',
      taxID: '',
      correlationID: '',
      address: {},
    },
    description:
      'Customer information (optional, requires name + one identifier (taxID, email, phone))',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['create'],
      },
    },
    options: [
      { displayName: 'Name', name: 'name', type: 'string', default: '' },
      { displayName: 'Email', name: 'email', type: 'string', default: '' },
      { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
      { displayName: 'Tax ID', name: 'taxID', type: 'string', default: '' },
      {
        displayName: 'Correlation ID',
        name: 'correlationID',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'collection',
        default: {
          zipcode: '',
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          country: '',
          complement: '',
        },
        options: [
          {
            displayName: 'Zipcode',
            name: 'zipcode',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Number',
            name: 'number',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Neighborhood',
            name: 'neighborhood',
            type: 'string',
            default: '',
          },
          { displayName: 'City', name: 'city', type: 'string', default: '' },
          { displayName: 'State', name: 'state', type: 'string', default: '' },
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Complement',
            name: 'complement',
            type: 'string',
            default: '',
          },
        ],
      },
      {
        displayName: 'Ensure Same Tax ID',
        name: 'ensureSameTaxID',
        type: 'boolean',
        default: false,
      },
    ],
  },
  {
    displayName: 'Days For Due Date',
    name: 'daysForDueDate',
    type: 'number',
    default: '',
    description:
      'Time in days until the charge hits the deadline for OVERDUE charges',
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Days After Due Date',
    name: 'daysAfterDueDate',
    type: 'number',
    default: '',
    description: 'Time in days that a charge is payable after the deadline',
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Interests',
    name: 'interests',
    type: 'collection',
    default: { value: 0 },
    options: [
      {
        displayName: 'Value (basis points)',
        name: 'value',
        type: 'number',
        default: 0,
      },
    ],
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Fines',
    name: 'fines',
    type: 'collection',
    default: { value: 0 },
    options: [
      {
        displayName: 'Value (basis points)',
        name: 'value',
        type: 'number',
        default: 0,
      },
    ],
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Discount Settings',
    name: 'discountSettings',
    type: 'collection',
    default: {},
    options: [
      {
        displayName: 'Modality',
        name: 'modality',
        type: 'options',
        options: [
          {
            name: 'Fixed Value Until Specified Date',
            value: 'FIXED_VALUE_UNTIL_SPECIFIED_DATE',
          },
          {
            name: 'Percentage Until Specified Date',
            value: 'PERCENTAGE_UNTIL_SPECIFIED_DATE',
          },
        ],
        default: '',
      },
      {
        displayName: 'Discount Fixed Date',
        name: 'discountFixedDate',
        type: 'fixedCollection',
        default: [],
        typeOptions: { multipleValues: true },
        placeholder: 'Add Discount Fixed Date',
        options: [
          {
            displayName: 'Discount',
            name: 'discount',
            values: [
              {
                displayName: 'Days Active',
                name: 'daysActive',
                type: 'number',
                default: 0,
              },
              {
                displayName: 'Value (cents)',
                name: 'value',
                type: 'number',
                default: 0,
              },
            ],
          },
        ],
      },
    ],
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Additional Info',
    name: 'additionalInfo',
    type: 'fixedCollection',
    default: [],
    typeOptions: { multipleValues: true },
    placeholder: 'Add Additional Info',
    options: [
      {
        displayName: 'Info',
        name: 'info',
        values: [
          { displayName: 'Key', name: 'key', type: 'string', default: '' },
          { displayName: 'Value', name: 'value', type: 'string', default: '' },
        ],
      },
    ],
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Enable Cashback Percentage',
    name: 'enableCashbackPercentage',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Enable Cashback Exclusive Percentage',
    name: 'enableCashbackExclusivePercentage',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Subaccount (pixKey)',
    name: 'subaccount',
    type: 'string',
    default: '',
    description: 'Pix key of the subaccount',
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  {
    displayName: 'Splits',
    name: 'splits',
    type: 'fixedCollection',
    typeOptions: { multipleValues: true },
    placeholder: 'Add Split',
    default: [],
    options: [
      {
        displayName: 'Split',
        name: 'split',
        values: [
          {
            displayName: 'Value (cents)',
            name: 'value',
            type: 'number',
            default: 0,
          },
          {
            displayName: 'Pix Key',
            name: 'pixKey',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Split Type',
            name: 'splitType',
            type: 'options',
            options: [
              {
                name: 'SPLIT_INTERNAL_TRANSFER',
                value: 'SPLIT_INTERNAL_TRANSFER',
              },
              { name: 'SPLIT_SUB_ACCOUNT', value: 'SPLIT_SUB_ACCOUNT' },
              { name: 'SPLIT_PARTNER', value: 'SPLIT_PARTNER' },
            ],
            default: 'SPLIT_INTERNAL_TRANSFER',
          },
        ],
      },
    ],
    displayOptions: { show: { resource: ['charge'], operation: ['create'] } },
  },
  // Create Refund fields
  {
    displayName: 'Refund Value',
    name: 'value',
    type: 'number',
    required: true,
    default: '',
    description: 'Refund value into cents',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  {
    displayName: 'Refund CorrelationID',
    name: 'correlationID',
    type: 'string',
    required: true,
    default: '',
    description: 'Unique identifier for the refund',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comment for the refund',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['createRefund'],
      },
    },
  },
  // Update expiration date fields
  {
    displayName: 'ExpiresDate (ISO 8601)',
    name: 'expiresDate',
    type: 'string',
    default: '',
    placeholder: '2021-04-01T17:28:51.882Z',
    description: 'New expiration date in ISO 8601 format',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['updateChargeExpiration'],
      },
    },
  },
  // Get QR Code Image fields
  {
    displayName: 'Size',
    name: 'size',
    type: 'number',
    default: 1024,
    placeholder: '1024',
    description:
      'Size of the image in pixels (optional). Must be an integer between 600 and 4096. Defaults to 1024 when not provided.',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['getQrImage', 'getQrImageBase64'],
      },
    },
  },
  {
    displayName: 'charge link payment ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    description:
      'charge link payment ID Example: fe7834b4060c488a9b0f89811be5f5cf ',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['getQrImage'],
      },
    },
  },
  {
    displayName: 'charge ID, payment link ID, or QR code ID ',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    description: 'Charge ID, payment link ID, or QR code ID',
    displayOptions: {
      show: {
        resource: ['charge'],
        operation: ['getQrImageBase64'],
      },
    },
  },
];
