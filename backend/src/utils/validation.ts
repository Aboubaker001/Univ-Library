import { ZodSchema } from "zod";

const validate = (data: object, schema: ZodSchema) => {
    try{
        const validatedData = schema.parse(data);
        return validatedData;
    }catch(err){
        return false;
    }
}
export default validate;