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
import { paymentProperties } from './Payment';
import { pspProperties } from './Psp';
import { partnerProperties } from './Partner';
import { applicationProperties } from './Application';
import { webhookProperties } from './Webhook';
import { cashbackFidelityProperties } from './CashbackFidelity';
import { fraudValidationProperties } from './FraudValidation';
import { transactionProperties } from './Transaction';
import { statementProperties } from './Statement';
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
  ...paymentProperties,
  ...pspProperties,
  ...partnerProperties,
  ...applicationProperties,
  ...cashbackFidelityProperties,
  ...webhookProperties,
  ...fraudValidationProperties,
  ...transactionProperties,
  ...statementProperties,
  ...disputeProperties,
  ...accountRegisterProperties,
  ...accountProperties,
];
