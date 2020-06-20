import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './src/routes.ts';
import { createDatabase } from './src/db/createDatabase.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";

createDatabase();

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const { APP_HOST, APP_PORT } = config();
console.log(`Listening on port ${APP_PORT}...`);
await app.listen(`${APP_HOST}:${APP_PORT}`);