import Exceptions from "./Exceptions.js";

class HttpExeception extends Error{
    message: string;
    status : number;
    error : Exceptions
    constructor(message : string , status : number,error : Exceptions){
        super(message);
        this.status = status;
        this.message = message;
        this.error = error;
    }
}
export default HttpExeception;