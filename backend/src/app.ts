import express from 'express';
import { PORT } from './config/env.js';
import mainRouter from './routes/mainRouter.js';
import { errorResponse } from './middleware/errorHandler.js';


//set up an express app :
const app = express();
// use json middleware :
app.use(express.json());
//user urlencoded middleware :
app.use(express.urlencoded({extended : true}));
//test route :
app.get('/',(req , res) => {
    res.send("App is woring well");
})
//set up the routes :
app.use('/api',mainRouter);
//set error handler to app :
app.use(errorResponse)

//bind application to port :
app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
});