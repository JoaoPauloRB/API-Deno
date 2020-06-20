import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

export const createDatabase = async () => {
    const db = new DB(config().DB_PATH);
    db.query("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL)");
    db.close();
};
