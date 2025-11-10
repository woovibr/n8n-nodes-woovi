import type { IExecuteFunctions } from 'n8n-workflow';

import { createCharge } from './createCharge';
import { createSubaccount } from './createSubaccount';
import { debitSubaccount } from './debitSubaccount';
import { deleteSubaccount } from './deleteSubaccount';
import { getSubaccount } from './getSubaccount';
import { listSubaccounts } from './listSubaccounts';
import { transferSubaccounts } from './transferSubaccounts';
import { withdrawSubaccount } from './withdrawSubaccount';
import { createCustomer } from './createCustomer';
import { listCustomers } from './listCustomers';

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
    createCustomer,
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
};
