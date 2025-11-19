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
    listSubscriptionInstallments,
  },
};
