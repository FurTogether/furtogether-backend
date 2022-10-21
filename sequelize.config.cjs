require('dotenv').config();

// module.exports = {
// development: {
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   host: process.env.POSTGRES_HOST,
//   dialect: 'postgres',
// },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: {
//         // https://github.com/sequelize/sequelize/issues/12083
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   },
// };

module.exports = {
  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: process.env.DB_DIALECT,
  // },
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
