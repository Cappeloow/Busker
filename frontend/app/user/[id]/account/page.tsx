import {getAllUserOrders } from '@/app/services/SSRAuth';
type Props = {}

async function page({}: Props) {
  const ordersWithItems = await getAllUserOrders();
  console.log("ORDER ITEMS-----:",ordersWithItems);
  return (
    <div>
      {ordersWithItems.map((orderWithItems, index) => (
        <div key={index}>
          <h2>Order #{index + 1}</h2>
          <p>Order Details: {JSON.stringify(orderWithItems.order)}</p>
          <ul>
            {orderWithItems.orderItems.map((orderItem, itemIndex) => (
              <li key={itemIndex}>
                Item #{itemIndex + 1}: {JSON.stringify(orderItem)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default page