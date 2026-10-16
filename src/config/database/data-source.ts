import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

// Chỉ export đúng một lần duy nhất
export default new DataSource({
  type: 'postgres',
  url: process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
