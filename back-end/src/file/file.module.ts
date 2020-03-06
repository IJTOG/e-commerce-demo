import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { usersProviders } from "../user/user.providers";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "./files"
    })
  ],
  controllers: [FileController],
  providers: [FileService, ...usersProviders]
})
export class FileModule {}
