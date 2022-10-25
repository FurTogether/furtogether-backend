import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import AuthRouter from './routes/auth.routes.js';
import ProfileRouter from './routes/profile.routes.js';
import WalkRouter from './routes/walk.routes.js';
import RoutineRouter from './routes/routine.routes.js';
import PhotoAlbumRouter from './routes/photoalbum.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const corsOptions = {
  origin: 'https://furtogether-af128.web.app',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'X-API-Key',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // preflightContinue: true,
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
const routers = [
  AuthRouter,
  ProfileRouter,
  WalkRouter,
  RoutineRouter,
  PhotoAlbumRouter,
];
routers.forEach((router) => app.use('/', router));

app.use(errorMiddleware);
app.set('trust proxy', true);

// Set Express to listen on the given port
// const PORT = process.env.PORT || 3004;
const PORT = process.env.PORT || 8080;
app.listen(PORT);

console.log(`🚀 App listening on the port ${PORT}`);
