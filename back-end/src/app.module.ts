import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";
import { databaseProviders } from "./database.providers";

@Module({
  imports: [UserModule, FileModule],
  controllers: [AppController],
  providers: [...databaseProviders]
})
export class AppModule {}
