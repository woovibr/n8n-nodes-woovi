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
import { companyProperties } from './Company';
import { receiptProperties } from './Receipt';
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
  ...decodeProperties,
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
  ...transferProperties,
  ...receiptProperties,
  ...companyProperties,
  ...accountRegisterProperties,
  ...accountProperties,
];
