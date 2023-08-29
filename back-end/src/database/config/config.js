require('dotenv').config();
// const mysql2 = require('mysql2');

// const environment = process.env.NODE_ENV || 'test';

// const suffix = {
//   prod: '',
//   production: '',
//   dev: '-dev',
//   development: '-dev',
//   test: '-test',
// };

const options = {
  use_env_variable: process.env.USE_ENV_VARIABLE || null,
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  // database: 
  //   `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment] || suffix.test}`,
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  // ssl: true,
  dialectOptions: {
    timezone: 'Z',
    ssl: {
      rejectUnauthorized: true,        
    },
  },
  logging: false,
};

// if (options.dialect === 'mysql') {
//   options.dialectModule = mysql2;
// }

// const options = {
//   use_env_variable: "DATABASE_URL",
//   dialect: "mysql",
//   ssl: true,
//   dialectOptions: {
//       ssl: {
//           rejectUnauthorized: true,        
//       }
//   }
// }

// console.log(options);
// console.log(process.env.HOSTNAME);
// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_DB_NAME);

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
