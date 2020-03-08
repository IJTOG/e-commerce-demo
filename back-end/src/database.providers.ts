import { Sequelize } from "sequelize-typescript";
import { User } from "./user/user.entity";
import { Product } from "./product/product.entity";
import * as dotenv from "dotenv";
dotenv.config();

const url = process.env.DATABASE_URL || "localhost";
const password = process.env.DATABASE_PASSWORD || "";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: url,
        port: 3306,
        username: "root",
        password: password,
        database: "e-commerce"
      });
      sequelize.addModels([User, Product]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
