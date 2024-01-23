import { ICartItem } from "../types";
export const BUSKER_BACKEND_URL = "http://localhost:5000"


   /*
   *   OOO   RRRR   DDDD  EEEE  RRRR  SSSS
   *  O   O  R   R D   D E     R   R S
   *  O   O  RRRR  D   D EEEE  RRRR   SSS
   *  O   O  R   R D   D E     R   R      S
   *   OOO   R   R DDDD  EEEE  R   R SSSS
   */

   export const createOrder = async (orderItems:Array<ICartItem>) => {
    //   const orderItems = [
    //     {
    //       "name": "Busker QR Sign",
    //       "description": "This is your unique Busker Sign. When your out on the street och playing on a Pub, do not forget to bring your sign in order to really connect with your fans!",
    //       "price": 199,
    //       "quantity": 2
    //     },
    // ]
    
    const response = await fetch(`${BUSKER_BACKEND_URL}/order/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify(orderItems),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    const data = await response.json();
    return data;
  
    }


    export const getOrderConfirmation = async (id:string) => {
        console.log(id);
        const response = await fetch(`${BUSKER_BACKEND_URL}/order/confirmation`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
          })
          console.log(response);
          if(!response.ok) {
            return null;
          }
        
          return response.json();
    }