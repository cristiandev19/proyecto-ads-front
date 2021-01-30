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

export interface IRol {
  desc_rol: string;
  resumen: string;
}

export interface IAccion {
  desc_accion: string;
  ruta_accion: string;
  resumen: string;
}

export interface IAsignarAccion {
  _id_accion: string;
  _id_rol: string;
}

export interface IProducto {
  id_producto   : number;
  desc_producto : string;
  stock         : number;
  precio        : string;
}

export const CONFIRM_ACTIONS = {
  YES: 1,
  NO: 0
}