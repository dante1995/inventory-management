// types.ts
import { SalesOrder, Customer, Store } from "@/state/api";

export interface ExtendedSalesOrder extends SalesOrder {
  customer?: Customer;
  store?: Store;
}
