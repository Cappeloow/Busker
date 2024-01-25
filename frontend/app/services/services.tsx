import { redirect } from "next/dist/server/api-utils";
import {headers} from 'next/headers';
import { ILink } from "../types";
export const BUSKER_BACKEND_URL = "http://localhost:5000"
export const BUSKER_FRONTEND_URL = "http://localhost:3000"

/*
   *   PPP    RRRR   OOO   DDDD  U   U  CCCC  TTTTT  SSSS
   *   P   P  R   R O   O D   D U   U C        T   S
   *   PPP    RRRR  O   O D   D U   U C        T    SSS
   *   P      R   R O   O D   D U   U C        T       S
   *   P      R   R  OOO  DDDD   UUU   CCCC    T   SSSS
   */


export const getAllProducts = async () => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/product/all`);
    const data = await response.json();
    return data;
}


export const getSpecificProduct = async (id: string) => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/product/${id}`);
    const data = await response.json();
    return data;
}


 /*
   *   U   U  SSSS  EEEE  RRRR
   *   U   U S      E     R   R
   *   U   U  SSS   EEEE  RRRR
   *   U   U      S E     R   R
   *    UUU   SSSS   EEEE  R   R
   */

 export const getAllUsers = async () => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/user/all`,{
      next:{
        revalidate: 10
      }
    });
    const data = await response.json();
    return data;
 } 


 export const getUserById = async (id: string) => {
  const response = await fetch(`${BUSKER_BACKEND_URL}/user/${id}`);
  const data = response.json();
  return data;
 }

 export const authStatus = async () => {
  const response = await fetch(`${BUSKER_BACKEND_URL}/auth/status`,{
    credentials: 'include',
    next:{
      revalidate: 4
    }
  });
  if (response.status === 401) {
    return response.status;
  }
  const data = await response.json();
  return data;
 }

 export const getUserImg = async (id: string): Promise<string> => {
  try {
    const response = await fetch(`${BUSKER_BACKEND_URL}/user/${id}/profileImg`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.blob();
    const image = URL.createObjectURL(data)
  
    return image;
  } catch (error:any) {
    console.error('Error fetching user image:', error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};


export const generateQRCode = async (id:string) =>  {
  try {
    const response = await fetch(`${BUSKER_BACKEND_URL}/user/qrCode/${id}`)
    const data = await response.json();
    return data;
  } catch (error:any) {
    console.error('Error fetching user image:', error.message);
  }
}


export const updateUserDetails = async () => {
  const userDetails = {
    artistName:"Casper Mazzoreti",
  }
  const response = await fetch(`${BUSKER_BACKEND_URL}/user/update`,
  {
    method: "PUT",
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userDetails)
  }
  )
  const data = await response.json();
  console.log(data);

}

export const uploadImage = async (formData: FormData) => {
  // Remove the 'Content-Type' header and stringify the body
  const response = await fetch(`${BUSKER_BACKEND_URL}/user/uploadProfileImg`, {
    method: "POST",
    body: formData,
    credentials: 'include',
  });
  console.log(await response.json());

  // Rest of your code...
};

   /*
   *   OOO   RRRR   DDDD  EEEE  RRRR  SSSS
   *  O   O  R   R D   D E     R   R S
   *  O   O  RRRR  D   D EEEE  RRRR   SSS
   *  O   O  R   R D   D E     R   R      S
   *   OOO   R   R DDDD  EEEE  R   R SSSS
   */



  export const getAllUserOrders = async () => {
    const response = await fetch(`${BUSKER_BACKEND_URL}/order`, 
    { 
    method: 'GET', 
    credentials:'include',
    headers:{
      'Accept': 'application/json',  
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();
  return data;
  }

     /*
   *   L      III   N   N K   K SSSS
   *   L       I    NN  N K  K  S
   *   L       I    N N N K K    SSS
   *   L       I    N  NN K  K      S
   *   LLLLL  III   N   N K   K SSSS
   */

     export const getAllLinks =  async (id: string): Promise<[]>=> {
      const response = await fetch(`${BUSKER_BACKEND_URL}/link/${id}`,{
        next:{
          revalidate:1
        }
      })
      const data = await response.json();
      return data;
     }


     export const createLink = async (linkData:ILink) => {    
      try {
        const response = await fetch(`${BUSKER_BACKEND_URL}/link/create`, {
          method: 'POST',
          body: JSON.stringify(linkData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          // Handle error, e.g., throw an exception or log the error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Link created successfully:', data);
      } catch (error) {
        console.error('Error creating link:', error);
      }
    };
    

       /*
   *   AAAAA  V   V III L      AAAAA  BBBBB  III L      III TTTTT III EEEE  SSSS
   *   A   A  V   V  I  L      A   A  B   B   I  L       I    T   I  E     S
   *   AAAAA   V V   I  L      AAAAA  BBBBB   I  L       I    T   I  EEEE   SSS
   *   A   A    V    I  L      A   A  B   B   I  L       I    T   I  E          S
   *   A   A    V   III LLLLL  A   A  BBBBB  III LLLLL  III    T   I  EEEE SSSS
   */


       export const getAllAvailabilities = async (id:string) => {
        const response = await fetch(`${BUSKER_BACKEND_URL}/availability/${id}`,{
          next:{
            revalidate: 1
          }
        });
        const data = await response.json();
        return data;
       }