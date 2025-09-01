import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from '../routes';
import { connectDB } from './database';
import { syncModels } from '../models'; // Si usas el archivo index.ts de modelos

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', routes);

// Conexión a la base de datos
connectDB();
syncModels(); // Opcional, solo si sincronizas automáticamente

export default app;
