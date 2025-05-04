import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler.js";
import isLibrarian from "../middleware/isLibrarian.js";
import addNewBook from "../controllers/book/addNewBook.js";
import getBooksList from "../controllers/book/getBooksList.js";
import getBook from "../controllers/book/getSpecificBook.js";
import updateBookInfo from "../controllers/book/updateBookInfo.js";
import upload from "../services/upload/multer.js";
import uploadBookImage from "../controllers/book/uploadBookImage.js";

const bookRouter = Router();

//add new book :
bookRouter.post('/',errorHandler(isLibrarian),errorHandler(addNewBook));
//add new book :
bookRouter.post('/image/:id',upload.single("image"),errorHandler(isLibrarian),errorHandler(uploadBookImage));
//get specific book :
bookRouter.get('/:id',errorHandler(getBook));
//get books list :
bookRouter.get('/all',errorHandler(getBooksList));
//update book info :
bookRouter.put('/:id',errorHandler(isLibrarian),errorHandler(updateBookInfo));


export default bookRouter;