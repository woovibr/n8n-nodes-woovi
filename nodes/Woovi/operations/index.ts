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
import { listInvoices } from './listInvoices';
import { cancelInvoice } from './cancelInvoice';

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
  invoice: {
    listInvoices,
    cancelInvoice,
  },
};
