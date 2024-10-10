// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './controllers/Controller.js'; 
import connectDB from './config/dbConnect.js';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT 

connectDB(); 


app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
