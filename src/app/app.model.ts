export interface IUser {
  nombres: string;
  email: string;
  password: string;
  _id_rol?: string;
  isLoged: boolean;
}

export interface IProducto {
  desc_producto: string;
  id_producto: number;
  precio: string;
  stock: number;
}