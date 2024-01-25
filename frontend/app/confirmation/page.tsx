"use client";
import React, { useEffect, useState } from 'react'
import { getOrderConfirmation } from '../services/actions';
import { IOrder, IOrderItem } from '../types';
type Props = {}

function page({}: Props) {
  const [order, setOrder] = useState<IOrder | null>(null);
  useEffect(() => {
   async function fetchOrderConfirmation(){
      const storedOrderId = localStorage.getItem("orderId");
      const id = storedOrderId !== null ? JSON.parse(storedOrderId) : null;
      const orderFromConfirmation = await getOrderConfirmation(id);
      setOrder(orderFromConfirmation.order)
    }
    fetchOrderConfirmation();
  }, []);
  useEffect(() => {
    console.log(order);
  },[order])
  return (
    <div>
 
        {order && 
        <div>
          <h2>ORDERNUMBER: {order.orderId}</h2>
          <h3>Total sum of the order: {order.totalPrice} {order.currency.toUpperCase()}</h3>
          {order.orderItemsArray.map((orderItem,index) => (
               <ul key={index}>
               <li>
                <h3>Item:</h3>
                <p>{orderItem.title}</p>
                <p>{orderItem.price} ${order.currency.toUpperCase()}</p>
                <p>{orderItem.quantity} x</p>
               </li>
             </ul>
          ))
            }

        </div>
        }


    </div>
  )
}

export default page