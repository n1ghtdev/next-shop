import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isEnvFound = dotenv.config();

if (!isEnvFound) {
  throw new Error("Couldn't find .env file");
}

interface IConfig {
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
} as IConfig;
