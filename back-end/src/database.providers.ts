import { Sequelize } from "sequelize-typescript";
import { User } from "./user/user.entity";
import { Product } from "./product/product.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "e-commerce"
      });
      sequelize.addModels([User, Product]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
