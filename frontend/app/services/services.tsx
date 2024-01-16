export const BUSKER_BACKEND_URL = "http://localhost:5000"

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
    const response = await fetch(`${BUSKER_BACKEND_URL}/user/all`);
    const data = await response.json();
    return data;
 } 


 export const getUserById = async (id: string) => {
  const response = await fetch(`${BUSKER_BACKEND_URL}/user/${id}`);
  const data = response.json();
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
    console.log(data);
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
  console.log(formData); 

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

  export const createOrder = async () => {
    const orderItems = [
      {
        "name": "Busker QR Sign",
        "description": "This is your unique Busker Sign. When your out on the street och playing on a Pub, do not forget to bring your sign in order to really connect with your fans!",
        "price": 199,
        "quantity": 2
      },
  ]
  
  const response = await fetch(`${BUSKER_BACKEND_URL}/order/create-checkout-session`, {
    method: 'POST',
    body: JSON.stringify(orderItems),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
  })

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

     export const getAllLinks =  async (id: string): Promise<[]>=> {
      const response = await fetch(`${BUSKER_BACKEND_URL}/link/${id}`)
      const data = await response.json();
      console.log(data);
      return data;
     }


     export const createLink = async () => {
      const object = {
        Icon: "IG",
        Title: "Instagram",
        URL: "https://example.com"
      };
    
      try {
        const response = await fetch(`${BUSKER_BACKEND_URL}/link/create`, {
          method: 'POST',
          body: JSON.stringify(object),
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

    
      export const createAvailability = async () => {
        const inputData = {
          "date": "2005-01-04",
          "description":"@Restaurant Bingo"
        }
        //MÅSTE FIXA FELMEDDELANDET, VERKAR INTE VISA SIG.

        const response = await fetch(`${BUSKER_BACKEND_URL}/availability/create`, {
          method: "POST",
          body: JSON.stringify(inputData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }, 
          credentials: 'include',
        })
        if (!response.ok){
          console.log(response);
          return 'Something went wrong';
        }

        const data  = await response.json();
        console.log(data);
       }


       export const updateAvailability = async () => { 
        const updateAvailability = {
          "availabilityId":1,
          "date":"2002-01-19"
      }
        const response = await fetch(`${BUSKER_BACKEND_URL}/availability/update`,
        {
          method: "PUT",
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(updateAvailability)

        }
        )
        const data = await response.json();
        console.log(data);
       }

       export const getAllAvailabilities = async (id:string) => {
        const response = await fetch(`${BUSKER_BACKEND_URL}/availability/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
       }