import { Table, Column, Model } from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  image: string;
}
