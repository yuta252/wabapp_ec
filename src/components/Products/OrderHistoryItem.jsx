import React from 'react';
import { OrderHistory } from '../../templates';
import Divider from '@material-ui/core/Divider';
import { TextDetail } from '../UIkit';
import { OrderedProducts } from './index';


const datetimeToString = (date) => {
    // datetime型を日付に変更する
    return date.getFullYear() + '-' 
        + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('00' + date.getDate()).slice(-2) + ' '
        + ('00' + date.getHours()).slice(-2) + ':'
        + ('00' + date.getMinutes()).slice(-2) + ':'
        + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
    // datetime型を日付に変更する
    return date.getFullYear() + '-' 
        + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('00' + date.getDate()).slice(-2)
}


const OrderHistoryItem = (props) => {
    const order = props.order;
    const price = "￥" + order.amount.toLocaleString();
    // タイムスタンプ型を日付型に変更し日付のStringに変換
    const orderedDatetime = datetimeToString(order.updated_at.toDate());
    const shippingDate = dateToString(order.shipping_date.toDate());


    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={order.id} />
            <TextDetail label={"注文日時"} value={orderedDatetime} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={price} />
            {order.products.length > 0 && (
                <OrderedProducts products={order.products} />
            )}
            <div className="module-spacer--extra-extra-small" />
            <Divider />
        </div>
    )

}

export default OrderHistoryItem