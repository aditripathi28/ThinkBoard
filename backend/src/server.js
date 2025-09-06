import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from '../config/db.js'; 
import rateLimiter from "./middleware/rateLimiter.js";
import morgan from 'morgan';

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors());

app.use(express.json()); // to parse JSON bodies
app.use(rateLimiter);


app.use('/api/notes', notesRoutes);

connectDB().then(() => {
  
app.listen(PORT, () => {
  console.log('Server is running on PORT ', PORT);
});

});


