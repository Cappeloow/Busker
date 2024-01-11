import { getAllProducts } from "./services/actions";
export default async function Home() {
  const products = await getAllProducts();

console.log(products);
  return (
    <main>
      {products.map(product => (
       <div key={product.id}>
        <h1>{product.name}</h1>
       </div> 
      ))}
    </main>
  )
}
