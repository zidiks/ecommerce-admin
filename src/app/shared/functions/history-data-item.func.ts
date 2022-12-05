import { HistoryDataItem, HistoryDataItemWithCode } from "../models/order.model";
import { historyData } from "../constants/order-history.const";

export function historyDataItems(): HistoryDataItemWithCode[] {
  return Object.entries(historyData).map(([code, value]: [string, HistoryDataItem]) => ({...value, code}));
}
