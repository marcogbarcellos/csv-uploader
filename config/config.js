module.exports = {
  'development': {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASS: process.env.DB_PASS || 'postgres'
  }
};