import type { IExecuteFunctions } from 'n8n-workflow';

import { createCharge } from './createCharge';
import { getCharge } from './getCharge';
import { listCharges } from './listCharges';
import { listChargeRefunds } from './listChargeRefunds';
import { createChargeRefund } from './createChargeRefund';
import { updateChargeExpiration } from './updateChargeExpiration';
import { deleteCharge } from './deleteCharge';
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
import { getChargeQrCodeImage } from './getChargeQrCodeImage';
import { getQrCodeBase64 } from './getQrCodeBase64';
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
import { createApplication } from './createApplication';
import { deleteApplication } from './deleteApplication';
import { getPartnerCompany } from './getPartnerCompany';
import { listPartnerCompanies } from './listPartnerCompanies';
import { listWebhooks } from './listWebhooks';
import { deleteWebhook } from './deleteWebhook';
import { createWebhook } from './createWebhook';
import { getWebhookIps } from './getWebhookIps';
import { validateTaxId } from './validateTaxId';
import { validatePixKey } from './validatePixKey';
import { listTransactions } from './listTransactions';
import { listStatement } from './listStatement';
import { getTransaction } from './getTransaction';
import { listDisputes } from './listDisputes';
import { getDispute } from './getDispute';
import { uploadDisputeEvidence } from './uploadDisputeEvidence';
import { createAccountRegister } from './createAccountRegister';
import { getAccountRegister } from './getAccountRegister';
import { updateAccountRegister } from './updateAccountRegister';
import { deleteAccountRegister } from './deleteAccountRegister';
import { createAccount } from './createAccount';
import { withdrawAccount } from './withdrawAccount';
import { getAccount } from './getAccount';
import { listAccounts } from './listAccounts';
import { getCashbackBalance } from './getCashbackBalance';
import { createCashbackFidelity } from './createCashbackFidelity';

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
    get: getCharge,
    list: listCharges,
    listRefunds: listChargeRefunds,
    createRefund: createChargeRefund,
    updateChargeExpiration: updateChargeExpiration,
    deleteCharge: deleteCharge,
    getQrImage: getChargeQrCodeImage,
    getQrImageBase64: getQrCodeBase64,
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
    getCompany: getPartnerCompany,
    listCompanies: listPartnerCompanies,
  },
  webhook: {
    list: listWebhooks,
    delete: deleteWebhook,
    create: createWebhook,
    getIps: getWebhookIps,
  },
  fraudValidation: {
    validateTaxId,
    validatePixKey,
  },
  transaction: {
    list: listTransactions,
    get: getTransaction,
  },
  statement: {
    list: listStatement,
  },
  dispute: {
    list: listDisputes,
    get: getDispute,
    uploadEvidence: uploadDisputeEvidence,
  },
  accountRegister: {
    create: createAccountRegister,
    getByTaxId: getAccountRegister,
    update: updateAccountRegister,
    delete: deleteAccountRegister,
  },
  account: {
    create: createAccount,
    withdraw: withdrawAccount,
    get: getAccount,
    list: listAccounts,
  },
  application: {
    create: createApplication,
    delete: deleteApplication,
  },
  cashbackFidelity: {
    getByTaxId: getCashbackBalance,
    create: createCashbackFidelity,
  },
};
