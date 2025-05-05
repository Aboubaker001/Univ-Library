import { v4 as uuidV4 } from "uuid";
import supabase from "./supabaseClient.js";
const upload = async (file: Express.Multer.File) : Promise<string | null> => {
    const filePath = `uploads/${uuidV4()}+_${file.originalname}`;
    const { data, error } = await supabase.storage.from("booksimages").upload(filePath, file.buffer, { contentType: file.mimetype });
    if(error) {
        console.log(error);
        console.log("image not uploaded");
        return null
    };
    const publicUrl = supabase.storage.from('cars_images').getPublicUrl(filePath).data.publicUrl;
    return publicUrl;
}
export default upload;