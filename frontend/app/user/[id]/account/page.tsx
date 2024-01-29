import { getAllUserOrders } from '@/app/services/SSRAuth';
import { IOrder, IOrderItem } from '@/app/types';
type Props = {};

async function page({}: Props) {
  const orderList = await getAllUserOrders();
  console.log("ORDER LIST-----:", orderList);
  return (
    <div>
      {orderList.map((order:IOrder[{}], index:number) => (
        <div key={index}>
          <p>Ordernumber: {order.order.orderId}</p>
          <p>TotalPrice: {order.order.totalPrice} kr</p>
          <p>Status: {order.order.status}</p>
          <ul>
            {order.orderItems.map((orderItem:IOrderItem, itemIndex:number) => (
              <li key={itemIndex}>
                <p>{orderItem.quantity} x</p>
                <p>{orderItem.price} kr</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default page;
