import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Delete,
  Param
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("products")
  async findProducts(@Request() req) {
    return this.productService.getProducts();
  }

  @Post("product/create")
  async createProduct(@Body() product) {
    return this.productService.createProduct(product);
  }

  @Delete("product/delete/:id")
  async deleteProduct(@Param() params) {
    return this.productService.deleteProduct(params.id);
  }
}
