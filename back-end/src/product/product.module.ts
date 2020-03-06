import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { productProviders } from "./product.providers";
import { usersProviders } from "../user/user.providers";
import { AuthMiddleware } from "../user/auth.middleware";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders, ...usersProviders]
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "product", method: RequestMethod.GET });
  }
}
