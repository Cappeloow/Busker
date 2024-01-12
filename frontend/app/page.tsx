import { getAllProducts, getSpecificProduct, getAllUsers, getUserById } from "./services/services";
import Image from "next/image";
export default async function Home() {
  const users = await getAllUsers();
  const products = await getAllProducts();
  const product = await getSpecificProduct("prod_PHYZ4G9gdAh56r")
  const user = await getUserById("237ae2c7-8e56-4383-83ac-d8ac52c5be5e")

  // TODO:


  // FIX DATABASE TABLE ATTRIBUTES SO THEY ARE CAMELCASED
  // LOOK OVER THE USER IMAGE, HOW TO GET IT IN THE BEST POSSIBLE WAY?
  console.log(user);
  return (
    <main>
    </main>
  )
}
