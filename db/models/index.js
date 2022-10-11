import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../../sequelize.config.cjs';

import initUserModel from './user.js';
import initDogModel from './dog.js';
import initLocationModel from './location.js';
import initRoutineModel from './routine.js';
import initRoutineDogModel from './routineDog.js';
import initDailyModel from './daily.js';
import initPhotoModel from './photo.js';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Init Models
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Dog = initDogModel(sequelize, Sequelize.DataTypes);
db.Location = initLocationModel(sequelize, Sequelize.DataTypes);
db.Routine = initRoutineModel(sequelize, Sequelize.DataTypes);
db.RoutineDog = initRoutineDogModel(sequelize, Sequelize.DataTypes);
db.Daily = initDailyModel(sequelize, Sequelize.DataTypes);
db.Photo = initPhotoModel(sequelize, Sequelize.DataTypes);

// User relations
db.User.hasMany(db.Dog);
db.Dog.belongsTo(db.User);

// Routine_dog relations
db.Dog.hasMany(db.RoutineDog);
db.RoutineDog.belongsTo(db.Dog);
db.RoutineDog.belongsTo(db.Routine);
db.Routine.hasMany(db.RoutineDog);

// Routine Relations
db.User.hasMany(db.Routine);
db.Location.hasMany(db.Routine);
db.Routine.belongsTo(db.User);
db.Routine.belongsTo(db.Location);

// Daily Relations
db.User.hasMany(db.Daily);
db.Daily.belongsTo(db.User);
db.Location.hasMany(db.Daily);
db.Daily.belongsTo(db.Location);

// Photo Relations
db.Photo.belongTo(db.User);
db.Photo.belongTo(db.Dog);
db.Dog.hasMany(db.Photos);
db.User.hasMany(db.Photos);

// Sequelize init
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
