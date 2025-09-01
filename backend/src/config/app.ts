import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../routes';
import { connectDB } from './database';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

connectDB(); // Conexión DB

export default app;
