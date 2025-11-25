import { CustomExceptionGen } from "src/global/exceprion/exception.general";

export class ProductNotFoundException extends CustomExceptionGen {
    constructor(message: 'Product Not Found') {
        super(message);
        this.name = ProductNotFoundException.name;
        Error.captureStackTrace(this, this.constructor)
    }
}