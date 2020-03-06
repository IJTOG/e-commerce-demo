import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { AuthMiddleware } from "../user/auth.middleware";
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
export class FileModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "user", method: RequestMethod.POST });
  }
}
