import { getSecretSync } from '../libs/aws/secrets';

const config = getSecretSync('DB_SECRET');

export const HOST = config.RDS_HOST;
export const USER = config.RDS_USERNAME;
export const PASSWORD = config.RDS_PASSWORD;
export const DB = config.RDS_DB_PLATFORM_NAME;
export const dialect = 'mysql';
export const PORT = config.RDS_PORT;
export const pool = {
   max: 5,
   min: 0,
   acquire: 30000,
   idle: 10000,
};
