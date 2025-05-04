import express from 'express';
import { PORT } from './config/env.js';
import mainRouter from './routes/mainRouter.js';
import { errorResponse } from './middleware/errorHandler.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("App is woring well");
});
app.use('/api', mainRouter);
app.use(errorResponse);
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
