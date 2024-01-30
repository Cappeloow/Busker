import { redirect } from "next/dist/server/api-utils";
import {headers} from 'next/headers';
import { ILink } from "../types";


//ALL THE GETTERS 
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
        revalidate: 1
      }
    });
    const data = await response.json();
    return data;
 } 


 export const getUserById = async (id: string) => {
 const response = await fetch(`${BUSKER_BACKEND_URL}/user/${id}`, 
  {cache:'no-store'});
  const data = await response.json();
  return data;
 }


 // dont remove incase
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
 export const getUserImg = async (id: string): Promise<string | null> => {
  try {
    const response = await fetch(`${BUSKER_BACKEND_URL}/user/${id}/profileImg`);

    if (!response.ok) {
        // User not found or has no profile image
        return null;
    }

    const data = await response.blob();
    const image = URL.createObjectURL(data);
    return image;
  } catch (error: any) {
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



   /*
   *   OOO   RRRR   DDDD  EEEE  RRRR  SSSS
   *  O   O  R   R D   D E     R   R S
   *  O   O  RRRR  D   D EEEE  RRRR   SSS
   *  O   O  R   R D   D E     R   R      S
   *   OOO   R   R DDDD  EEEE  R   R SSSS
   */





     /*
   *   L      III   N   N K   K SSSS
   *   L       I    NN  N K  K  S
   *   L       I    N N N K K    SSS
   *   L       I    N  NN K  K      S
   *   LLLLL  III   N   N K   K SSSS
   */

     export const getAllLinks =  async (id: string): Promise<[]>=> {
      const response = await fetch(`${BUSKER_BACKEND_URL}/link/${id}`,
      
      { cache: 'no-store' })
      const data = await response.json();
      return data;
     }

     export const getTotalClicksCount = async (userId: string) => {
      const response = await fetch(`${BUSKER_BACKEND_URL}/link/${userId}/totalClicks`,{
        next:{
          revalidate:1
        }
      })
      if (!response.ok){
        return response.status;
      }
      const data =response.json();
      return data;
     }


    

       /*
   *   AAAAA  V   V III L      AAAAA  BBBBB  III L      III TTTTT III EEEE  SSSS
   *   A   A  V   V  I  L      A   A  B   B   I  L       I    T   I  E     S
   *   AAAAA   V V   I  L      AAAAA  BBBBB   I  L       I    T   I  EEEE   SSS
   *   A   A    V    I  L      A   A  B   B   I  L       I    T   I  E          S
   *   A   A    V   III LLLLL  A   A  BBBBB  III LLLLL  III    T   I  EEEE SSSS
   */


       export const getAllAvailabilities = async (id:string) => {
        const response = await fetch(`${BUSKER_BACKEND_URL}/availability/${id}`,{ cache: 'no-store' }
        );
        const data = await response.json();
        return data;
       }