// global interfaces so we can use them throughout the applcation

//PRODUCT 
export interface IProduct {
    id:string,
    name:string,
    price:number,
    description:string,
    images?:string[],
}

export interface ICartItem {
    name:string,
    price:number,
    description:string,
    quantity:number,
}
// USER
export interface IUser {
userId:string,
artistName:string,
country?:string,
linkClicks?:number,
}

export interface IUserDetails {
  email:string
  artistName: string;
  country: string;
  city: string;
};
// LINKS
export interface ILink {
    linkId?: string,
    title: string,
    url:string,
    linkClicks?: number,
};

// AVAILABILITY
export interface IAvailability {
  availabilityId?: string,
  date: string,
  description:string,
  status?: string,
  location?:string,
  bookingTime?: string,
}

// ORDERS

export interface IOrder {
  currency: string;
  orderId: string;
  orderItemsArray: IOrderItem[];
  totalPrice: number;
}

export interface IOrderItem {
  title: string;
  price: number;
  quantity: number;
}