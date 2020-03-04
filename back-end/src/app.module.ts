import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { databaseProviders } from "./database.providers";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [...databaseProviders]
})
export class AppModule {}
