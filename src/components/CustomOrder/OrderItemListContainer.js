import { OrderItemList } from "./OrderItemList"
import { CustomOrderItemListTotal } from "./CustomOrderItemListTotal"
import "./OrderItemListContainer.css"

export const OrderItemListContainer = ()=> {
    return(
        <div className="orderItemListContainer">
            <div className="orderItemListd">
                <h2 className="customOrderItemsTitle">Items</h2>
                <OrderItemList />
                <CustomOrderItemListTotal />
            </div>
        </div>
    )
}