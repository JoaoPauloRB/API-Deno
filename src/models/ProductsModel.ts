import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import IProduct from "../types/IProduct.ts";

export default class ProductsModel {
    list() {
        const db = new DB(config().DB_PATH);
        const listProducts: IProduct[] = [];
        for (const product of db.query("SELECT id, name, description, price FROM products")) {
            listProducts.push({
                id: product[0],
                name: product[1],
                description: product[2],
                price: product[3],
            });
        }
        db.close();
        return listProducts;
    }

    getById(id: number) {
        const db = new DB(config().DB_PATH);
        const resultQuery = [...db.query("SELECT id, name, description, price FROM products WHERE id = (?)", [id])][0];
        const product: IProduct = {
            id: resultQuery[0],
            name: resultQuery[1],
            description: resultQuery[2],
            price: resultQuery[3],
        };
        db.close();
        return product;
    }

    add(product: IProduct) {
        const db = new DB(config().DB_PATH);
        db.query("INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
            [product.name, product.description, product.price]
        );
        db.close();
    }

    update(product: IProduct) {
        const db = new DB(config().DB_PATH);
        db.query("UPDATE products set name=(?), description=(?), price=(?) WHERE id=(?)",
            [product.name, product.description, product.price, product.id]
        );            
        db.close();
    }

    delete(id: number) {
        const db = new DB(config().DB_PATH);
        db.query("DELETE FROM products WHERE id=(?)",[id]);
        db.close();
    }
}