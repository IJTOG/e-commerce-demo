import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("user")
  async findUser(@Request() req) {
    const _user = {
      username: req.user.username
    };
    return _user;
  }

  @UseGuards(AuthGuard("local"))
  @Post("user/login")
  async login(@Request() req): Promise<any> {
    const token = await this.userService.generateJWT(req.user);
    const _user = {
      username: req.user.username,
      token: token
    };
    return _user;
  }
}
