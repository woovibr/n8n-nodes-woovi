import type { IExecuteFunctions } from 'n8n-workflow';

import { createCharge } from './createCharge';
import { createSubaccount } from './createSubaccount';
import { debitSubaccount } from './debitSubaccount';
import { deleteSubaccount } from './deleteSubaccount';
import { getCustomer } from './getCustomer';
import { listSubaccounts } from './listSubaccounts';
import { transferSubaccounts } from './transferSubaccounts';
import { withdrawSubaccount } from './withdrawSubaccount';
import { createCustomer } from './createCustomer';
import { listCustomers } from './listCustomers';
import { getSubaccount } from './getSubaccount';
import { updateCustomer } from './updateCustomer';
import { listRefunds } from './listRefunds';
import { getRefund } from './getRefund';
import { createRefund } from './createRefund';
import { getInstallment } from './getInstallment';
import { createInstallmentCobr } from './createInstallmentCobr';
import { retryInstallmentCobr } from './retryInstallmentCobr';
import { listInvoices } from './listInvoices';
import { cancelInvoice } from './cancelInvoice';
import { getInvoicePdf } from './getInvoicePdf';
import { getInvoiceXml } from './getInvoiceXml';
import { createInvoice } from './createInvoice';
import { getSubscription } from './getSubscription';
import { listSubscriptionInstallments } from './listSubscriptionInstallments';
import { listSubscriptions } from './listSubscriptions';
import { createSubscription } from './createSubscription';
import { cancelSubscription } from './cancelSubscription';
import { updateSubscriptionValue } from './updateSubscriptionValue';
import { checkPixKey } from './checkPixKey';
import { setPixKeyDefault } from './setPixKeyDefault';
import { deletePixKey } from './deletePixKey';

import { createPixKey } from './createPixKey';
import { getPixKeyTokens } from './getPixKeyTokens';
import { listPixKeys } from './listPixKeys';
import { getQrCodeStatic } from './getQrCodeStatic';
import { listQrCodeStatic } from './listQrCodeStatic';
import { createQrCodeStatic } from './createQrCodeStatic';
import { createPayment } from './createPayment';
import { approvePayment } from './approvePayment';
import { listPayments } from './listPayments';
import { getPayment } from './getPayment';
import { listPsps } from './listPsps';
import { createPartnerCompany } from './createPartnerCompany';
import { createPartnerApplication } from './createPartnerApplication';

export type OperationHandler = (
  this: IExecuteFunctions,
  itemIndex: number,
) => Promise<any>;

export const wooviOperations: Record<
  string,
  Record<string, OperationHandler>
> = {
  charge: {
    create: createCharge,
  },
  customer: {
    listCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
  },
  subaccount: {
    listSubaccounts,
    getSubaccount,
    createSubaccount,
    withdrawSubaccount,
    debitSubaccount,
    deleteSubaccount,
    transferSubaccounts,
  },
  refund: {
    listRefunds,
    getRefund,
    createRefund,
  },
  installment: {
    getInstallment,
    createInstallmentCobr,
    retryInstallmentCobr,
  },
  invoice: {
    listInvoices,
    cancelInvoice,
    getInvoicePdf,
    getInvoiceXml,
    createInvoice,
  },
  subscription: {
    listSubscriptions,
    getSubscription,
    createSubscription,
    cancelSubscription,
    updateSubscriptionValue,
    listSubscriptionInstallments,
  },
  pixKey: {
    check: checkPixKey,
    setDefault: setPixKeyDefault,
    delete: deletePixKey,
    create: createPixKey,
    getTokens: getPixKeyTokens,
    list: listPixKeys,
  },
  qrCodeStatic: {
    create: createQrCodeStatic,
    get: getQrCodeStatic,
    list: listQrCodeStatic,
  },
  payment: {
    create: createPayment,
    approve: approvePayment,
    list: listPayments,
    get: getPayment,
  },
  psp: {
    list: listPsps,
  },
  partner: {
    createCompany: createPartnerCompany,
    createApplication: createPartnerApplication,
  },
};
