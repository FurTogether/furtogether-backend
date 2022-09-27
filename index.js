import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import AuthRouter from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const envFilePath = '.env';
dotenv.config({ path: path.normalize(envFilePath) });

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(cors(corsOptions));
app.use(methodOverride('_method'));

const routers = [AuthRouter];
routers.forEach((router) => app.use('/', router));

app.use(errorMiddleware);
app.set('trust proxy', true);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);

console.log(`🚀 App listening on the port ${PORT}`);
