const BACKEND_URL =  process.env.BUSKER_BACKEND_URL;

/*
   *   PPP    RRRR   OOO   DDDD  U   U  CCCC  TTTTT  SSSS
   *   P   P  R   R O   O D   D U   U C        T   S
   *   PPP    RRRR  O   O D   D U   U C        T    SSS
   *   P      R   R O   O D   D U   U C        T       S
   *   P      R   R  OOO  DDDD   UUU   CCCC    T   SSSS
   */


export const getAllProducts = async () => {
    const response = await fetch(`${BACKEND_URL}/product/all`);
    const data = await response.json();
    return data;
}


export const getSpecificProduct = async (id: string) => {
    const response = await fetch(`${BACKEND_URL}/product/${id}`);
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
    const response = await fetch(`${BACKEND_URL}/user/all`);
    const data = await response.json();
    return data;
 } 


 export const getUserById = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/user/${id}`);
  const data = response.json();
  return data;
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





       /*
   *   AAAAA  V   V III L      AAAAA  BBBBB  III L      III TTTTT III EEEE  SSSS
   *   A   A  V   V  I  L      A   A  B   B   I  L       I    T   I  E     S
   *   AAAAA   V V   I  L      AAAAA  BBBBB   I  L       I    T   I  EEEE   SSS
   *   A   A    V    I  L      A   A  B   B   I  L       I    T   I  E          S
   *   A   A    V   III LLLLL  A   A  BBBBB  III LLLLL  III    T   I  EEEE SSSS
   */
