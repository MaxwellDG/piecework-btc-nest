import { AccountRefactor1693444478869 } from 'src/migrations/1693444478869-AccountRefactor';
import { DataSource } from 'typeorm';

// always remember to build before running a migration

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [], // not entirely sure what this is used for. Is it only when you want TypeORM to generate the migrations for you?
  migrations: [AccountRefactor1693444478869],
});
