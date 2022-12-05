import { OrderHistory } from "../enums/order-history.enum";
import { HistoryDataItem } from "../models/order.model";

export const historyData: Record<string, HistoryDataItem> = {
  [OrderHistory.Pending]: {
    color: 'tui-neutral-fill',
    label: 'Ожидание',
    icons: 'tuiIconTime',
  },
  [OrderHistory.OrderStart]: {
    color: 'tui-success-fill',
    label: 'Заказ принят',
    icons: 'tuiIconCheck',
  },
  [OrderHistory.OrderDone]: {
    color: 'tui-success-fill',
    label: 'Заказ выполнен',
    icons: 'tuiIconDone',
  },
  [OrderHistory.Refund]: {
    color: 'tui-error-fill',
    label: 'Возврат',
    icons: 'tuiIconUndo',
  },
  [OrderHistory.ShippingStart]: {
    color: 'tui-info-fill',
    label: 'Отправлено',
    icons: 'tuiIconPin',
  },
  [OrderHistory.ShippingDone]: {
    color: 'tui-success-fill',
    label: 'Доставлено',
    icons: 'tuiIconPin',
  },
  [OrderHistory.Paid]: {
    color: 'tui-success-fill',
    label: 'Оплачено',
    icons: 'tuiIconCard',
  },
  [OrderHistory.Message]: {
    color: 'tui-info-fill',
    label: 'Информация',
    icons: 'tuiIconMail',
  },
}
