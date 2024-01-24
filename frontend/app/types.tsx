//PRODUCT 
export interface IProduct {
    id:string,
    name:string,
    price:number,
    description:string,
    image?:string,
}

export interface ICartItem {
    name:string,
    price:number,
    description:string,
    quantity:number,
}
// USER
// LINKS
export interface ILink {
    linkId?: string,
    icon:string,
    title: string,
    url:string,
};

// AVAILABILITY
export interface IAvailability {
  availabilityId: string,
  date: string,
  status: string,
  location:string,
  bookingTime: string,
  description:string,
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