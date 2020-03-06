import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { LocalStrategy } from "./local.strategy";
import { usersProviders } from "./user.providers";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, ...usersProviders]
})
export class UserModule {}
