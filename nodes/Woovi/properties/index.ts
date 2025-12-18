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
import { disputeProperties } from './Dispute';
import { decodeProperties } from './Decode';
import { transferProperties } from './Transfer';
import { paymentProperties } from './Payment';
import { pspProperties } from './Psp';
import { partnerProperties } from './Partner';
import { webhookProperties } from './Webhook';
import { fraudValidationProperties } from './FraudValidation';
import { transactionProperties } from './Transaction';
import { accountRegisterProperties } from './AccountRegister';
import { accountProperties } from './Account';

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
  ...decodeProperties,
  ...paymentProperties,
  ...pspProperties,
  ...partnerProperties,
  ...webhookProperties,
  ...fraudValidationProperties,
  ...transactionProperties,
  ...disputeProperties,
  ...transferProperties,
  ...accountRegisterProperties,
  ...accountProperties,
];
