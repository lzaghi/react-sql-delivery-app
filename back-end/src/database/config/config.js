require('dotenv').config();

let options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

if (process.env.USE_ENV_VARIABLE) {
  options = {
    use_env_variable: process.env.USE_ENV_VARIABLE,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

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
