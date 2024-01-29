import { BUSKER_BACKEND_URL } from "./services";
import { headers } from "next/headers";
export const authStatus = async () => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/auth/status`,{
      headers: Object.fromEntries(headers()),
     next:{
       revalidate: 4
     }
   });
   if (response.status === 401) {
    return null;
   }
   const data = await response.json();
   return data;
  }
  

  
  export const getAllUserOrders = async () => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/order`, 
    { 
    method: 'GET', 
    headers: Object.fromEntries(headers()),
    next:{
      revalidate: 4
    }
  })
  if (response.status === 401) {
    return console.log("not authorized");
  }
  const data = await response.json();
  return data;
  }