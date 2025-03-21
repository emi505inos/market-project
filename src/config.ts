import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    mongo: {
      dbName: process.env.MONGODB,
      port: parseInt(process.env.MONGO_PORT || '27017', 10),
      password: process.env.MONGO_ROOT_PASS,
      user: process.env.MONGO_ROOT_USER,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },

    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWTSECRET,
  };
});
