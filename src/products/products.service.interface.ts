import { Products } from "@prisma/client";

export interface ProductsServiceItf {
    getOneProduct(id: number): Promise<Products>;
}