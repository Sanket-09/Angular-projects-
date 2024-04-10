module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'hhs0039i',
  DB: 'fullstack',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
