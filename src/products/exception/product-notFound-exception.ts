import { CustomExceptionGen } from "src/global/exception/exception.general";

export class ProductNotFoundException extends CustomExceptionGen {
    constructor(message: string = 'Product Not Found') {
        super(message);
        this.name = ProductNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}