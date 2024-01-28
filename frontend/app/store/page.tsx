"use client";
import {useState, useEffect} from 'react'
import { getAllProducts } from '@/app/services/services'
import { createOrder } from '../services/actions';
import { IProduct,ICartItem } from '../types';
import { redirect } from 'next/navigation';
type Props = {}




const page = (props: Props) => {
    const [cart, setCart] = useState<ICartItem[] | []>([]);
    const [products, setProduct] = useState<IProduct[]>();
    useEffect(() => {
      const fetchProducts = async () => {
        const productsData = await getAllProducts();
        setProduct(productsData);
      }
      fetchProducts();
    },[])

    useEffect(() => {
      console.log(cart);
    },[cart])


    const addProduct = (product:IProduct) => {
      const productData = {
        name: product.name,
        price: product.price,
        description: product.description,
        quantity:1
      }
      setCart((prevCart) => {
        // Check if the product is already in the cart
        const existingProduct = prevCart?.find((item) => item.name === product.name);
    
        // If it exists, update the quantity, otherwise add it to the cart
        return existingProduct
          ? prevCart?.map((item) =>
              item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
            )
          : prevCart
          ? [...prevCart, productData]
          : [productData];
      });
    }

    const handleCheckout = async () => {
      try {
        const orderData = await createOrder(cart);
       localStorage.setItem("orderId", JSON.stringify(orderData.id));
  
        window.location.href= orderData.url
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    };

    return (
      <main className='store_main'>
        <div className='product_section'>
            {products && products.map((product:IProduct) => (
              <div key={product.id} className='product_card'>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <button onClick={() => addProduct(product)}>+</button>
              </div>
            ))}
        </div>

        <div className='cart_section'>

          {cart.map((cartItem, index) =>(
            <div key={index} className='cart_item'>
              <p>{cartItem.name} </p>
              <p>{cartItem.price * cartItem.quantity} kr </p>
              <p> {cartItem.quantity} x</p>
              </div>
          ))}
        </div>

          {cart.length >= 1 && (<><h1>{cart.length}x </h1>
        <button onClick={handleCheckout}>Go to Checkout</button></>)}
      </main>
    );
  };

export default page