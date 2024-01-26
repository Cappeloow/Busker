import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ICartItem, IAvailability } from "../types";
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


        /*
   *   AAAAA  V   V III L      AAAAA  BBBBB  III L      III TTTTT III EEEE  SSSS
   *   A   A  V   V  I  L      A   A  B   B   I  L       I    T   I  E     S
   *   AAAAA   V V   I  L      AAAAA  BBBBB   I  L       I    T   I  EEEE   SSS
   *   A   A    V    I  L      A   A  B   B   I  L       I    T   I  E          S
   *   A   A    V   III LLLLL  A   A  BBBBB  III LLLLL  III    T   I  EEEE SSSS
   */

    
        export const createAvailability = async (availabilityData:IAvailability) => {
          //MÅSTE FIXA FELMEDDELANDET, VERKAR INTE VISA SIG.
  
          console.log(availabilityData);
          const response = await fetch(`${BUSKER_BACKEND_URL}/availability/create`, {
            method: "POST",
            body: JSON.stringify(availabilityData),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }, 
            credentials: 'include',
          })
          if (!response.ok){
            return 'Something went wrong';
          }
  
          const data  = await response.json();
          console.log(data);
         }
  
  
         export const updateAvailability = async (availabilityData: IAvailability) => { 
          console.log(availabilityData);
        //   const updateAvailability = {
        //     "availabilityId":"408ed02c-f21b-4f3e-965b-b3a09d907053",
        //     "date":"1395-01-04",
        //     "location": "Göteborg",
        //     "bookingTime":"20:00",
        //     "status": "In Talks",
        // }
          const response = await fetch(`${BUSKER_BACKEND_URL}/availability/update`,
          {
            method: "PUT",
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(availabilityData)
  
          }
          )
          const data = await response.json();
          console.log(data);
         }


   /*
   *   L      III   N   N K   K SSSS
   *   L       I    NN  N K  K  S
   *   L       I    N N N K K    SSS
   *   L       I    N  NN K  K      S
   *   LLLLL  III   N   N K   K SSSS
   */


   export const deleteLink = async (linkId:string) => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/link/delete`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({linkId})
    })
    console.log(response);
   }

            

    /*
   *   U   U  SSSS  EEEE  RRRR
   *   U   U S      E     R   R
   *   U   U  SSS   EEEE  RRRR
   *   U   U      S E     R   R
   *    UUU   SSSS   EEEE  R   R
   */


    export const addAmountToLink = async (linkId:string, userId:string) => {
      console.log(linkId);
      const response = await fetch(`${BUSKER_BACKEND_URL}/link/clicked`,{
        method: 'POST',
        body: JSON.stringify({linkId}),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      const data = response.json();
      console.log(data);
      if (response.status === 200) {
        return;
      }
    }