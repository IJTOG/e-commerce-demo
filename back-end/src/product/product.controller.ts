import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("product")
  async findProducts(@Request() req) {
    // const _user = await this.usersRepository.create<User>({
    //   username: "test@ee.com",
    //   password: "123"
    // });
    return true;
  }

  // @UseGuards(AuthGuard("local"))
  // @Post("user/login")
  // async login(@Request() req): Promise<any> {
  //   const token = await this.userService.generateJWT(req.user);
  //   const _user = {
  //     username: req.user.username,
  //     token: token
  //   };
  //   return _user;
  // }
}
