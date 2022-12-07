import { OrderHistory } from "../enums/order-history.enum";

export interface HistoryDataItem {
  type: OrderHistory;
  color: string;
  label: string;
  icons: string;
}

export interface HistoryDataItemWithCode {
  code: string;
  color: string;
  label: string;
  icons: string;
}
