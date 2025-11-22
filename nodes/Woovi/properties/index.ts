import type { INodeProperties } from 'n8n-workflow';

import { chargeProperties } from './Charge';
import { subaccountProperties } from './Subaccount';
import { customerProperties } from './Customer';
import { refundProperties } from './Refund';
import { invoiceProperties } from './Invoice';
import { installmentProperties } from './Installment';
import { subscriptionProperties } from './Subscription';
import { pixKeyProperties } from './PixKey';
import { qrCodeStaticProperties } from './QrCodeStatic';

export const wooviNodesProperties: INodeProperties[] = [
  ...chargeProperties,
  ...subaccountProperties,
  ...customerProperties,
  ...refundProperties,
  ...invoiceProperties,
  ...installmentProperties,
  ...subscriptionProperties,
  ...pixKeyProperties,
  ...qrCodeStaticProperties,
];
