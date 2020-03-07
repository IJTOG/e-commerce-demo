import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch
} from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("products")
  async findProducts() {
    return this.productService.getProducts();
  }

  @Get("products/:id")
  async findProduct(@Param() params) {
    return this.productService.getProduct(params.id);
  }

  @Post("products/create")
  async createProduct(@Body() product) {
    return this.productService.createProduct(product);
  }

  @Patch("products/update")
  async updateProduct(@Body() product) {
    return this.productService.updateProduct(product);
  }

  @Delete("products/delete/:id")
  async deleteProduct(@Param() params) {
    return this.productService.deleteProduct(params.id);
  }
}
