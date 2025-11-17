import type { INodeProperties } from 'n8n-workflow';

import { chargeProperties } from './Charge.node';
import { subaccountProperties } from './Subaccount.node';
import { customerProperties } from './Customer.node';
import { refundProperties } from './Refund.node';
import { invoiceProperties } from './Invoice.node';
import { installmentProperties } from './Installment.node';

export const wooviNodesProperties: INodeProperties[] = [
  ...chargeProperties,
  ...subaccountProperties,
  ...customerProperties,
  ...refundProperties,
  ...invoiceProperties,
  ...installmentProperties,
];
