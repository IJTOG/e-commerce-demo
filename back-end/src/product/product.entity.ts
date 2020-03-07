import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  detail: string;

  @Column
  image: string;
}
