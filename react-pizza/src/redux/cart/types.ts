export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    count: number,
    type: string,
    size: number
  }
  
  export interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
  }