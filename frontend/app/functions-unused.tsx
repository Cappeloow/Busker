  // const users = await getAllUsers();
  // const products = await getAllProducts();
  // const product = await getSpecificProduct("prod_PHYZ4G9gdAh56r")
  // const user = await getUserById("237ae2c7-8e56-4383-83ac-d8ac52c5be5e")
  // const links = getLinks("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");
  // const availabilities = getAllAvailabilities("237ae2c7-8e56-4383-83ac-d8ac52c5be5e");

  // TODO:
  // updateAvailability();
  // createAvailability();


//   function UserImage( id: string) {
//     const [url, setUrl] = useState<string | null>(null);
//     useEffect(() => {
//       (async () => {
//         const image = await getUserImg(id);
//         setUrl(image);
//       })();
//       return () => {
//         if (url) URL.revokeObjectURL(url);
//       };
//     }, [id]);
  
//     if (!url) return null;
//     // next/image doesn't offer any benefits in this case
//     return <Image src={url} alt="test" width={500} height={500} />;
//   }

//   const img = UserImage("229ec007-f043-41dd-89cb-44e7712b2268");


//   <button onClick={() => createLink()}>
//   post Link
// </button>
// <button onClick={() => createAvailability()}>
//   post availability
// </button>
// <button onClick={() => createOrder()}>
//   create order
// </button>
// <button onClick={() =>   updateUserDetails()}>
//   update userDetails
// </button>
  
// {img ? img : "Loading..."}