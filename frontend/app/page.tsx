"use client";
import { useEffect, useState } from "react";
import {updateUserDetails, getAllUserOrders, createOrder, generateQRCode, getAllProducts, getSpecificProduct, getAllUsers, getUserById, getUserImg, getAllLinks, createLink, createAvailability, getAllAvailabilities, updateAvailability } from "./services/services";
import Image from "next/image";
import { BUSKER_BACKEND_URL } from "./services/services";
function UserImage( id: string) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const image = await getUserImg(id);
      setUrl(image);
    })();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [id]);

  if (!url) return null;
  // next/image doesn't offer any benefits in this case
  return <Image src={url} alt="test" width={500} height={500} />;
}

export default function Home() {
  // const users = await getAllUsers();
  // const products = await getAllProducts();
  // const product = await getSpecificProduct("prod_PHYZ4G9gdAh56r")
  // const user = await getUserById("237ae2c7-8e56-4383-83ac-d8ac52c5be5e")
  // const links = getLinks("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");
  // const availabilities = getAllAvailabilities("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");

  // TODO:
  // updateAvailability();
  // createAvailability();
  const img = UserImage("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");
  // FIX DATABASE TABLE ATTRIBUTES SO THEY ARE CAMELCASED
  // LOOK OVER THE USER IMAGE, HOW TO GET IT IN THE BEST POSSIBLE WAY?
  const orders = getAllUserOrders();
  return (
    <main>
      {/* {availabilities.map((availabilities) => {
        <div key={availabilities.}>

        </div>
      }} */}
      {img ? img : "Loading..."}
      <button onClick={() => {
        window.location.href = `${BUSKER_BACKEND_URL}/auth/google`
      }}>
        Hello
      </button>
      <button onClick={() => createLink()}>
        post Link
      </button>
      <button onClick={() => createAvailability()}>
        post availability
      </button>
      <button onClick={() => createOrder()}>
        create order
      </button>
      <button onClick={() =>   updateUserDetails()}>
        update userDetails
      </button>
    </main>
  )
}
