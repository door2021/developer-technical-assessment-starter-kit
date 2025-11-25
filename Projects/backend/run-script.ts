// backend/run-script.ts
import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

async function runScript() {
  await AppDataSource.initialize();
  const sql = fs.readFileSync(
    path.join(__dirname, '../../Projects/database/script.sql'),
    'utf8',
  );
  await AppDataSource.query(sql);
  console.log('SQL script executed successfully');
  await AppDataSource.destroy();
}

runScript().catch(console.error);
