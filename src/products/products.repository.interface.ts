import { Products } from "@prisma/client"

export interface ProductsRepositoryItf {
    getProduct(id: number): Promise<OutDetailProduct | null>
}
export type OutDetailProduct = (Products & { reviews })