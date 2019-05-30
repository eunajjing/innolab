import express from 'express'
import { createConnection } from 'typeorm'
import { installMessageRouter, installUserRouter } from './rest/routers'

export default async function bootstrap() {
  const connection = await createConnection();
  const port = 9999;

  const app = express();
  installMessageRouter(app, '/messages', connection);
  installUserRouter(app, '/users', connection);

  await app.listen(port);
  console.log(`Server is running... http://localhost:${port}`);
}