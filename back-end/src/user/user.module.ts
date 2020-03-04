import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthMiddleware } from "./auth.middleware";
import { LocalStrategy } from "./local.strategy";
import { usersProviders } from "./user.providers";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, ...usersProviders]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "user", method: RequestMethod.GET });
  }
}
