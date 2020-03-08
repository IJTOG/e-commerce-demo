import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { Product } from "./product.entity";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class ProductService {
  constructor(
    @Inject("PRODUCTS_REPOSITORY")
    private readonly productsRepository: typeof Product
  ) {}

  getProducts = async () => {
    try {
      let _products = [];
      const _res = await this.productsRepository.findAll<Product>();
      _res.map((item, index) => {
        _products.push(_res[index].dataValues);
      });
      const result = { entities: _products };
      return result;
    } catch {
      return false;
    }
  };

  getProduct = async _id => {
    try {
      const _product = await this.productsRepository.findOne<Product>({
        where: {
          id: _id
        },
        order: [["createdAt", "DESC"]]
      });
      const result = { entities: _product.dataValues };
      return result;
    } catch {
      throw new HttpException("Product not found.", HttpStatus.BAD_REQUEST);
    }
  };

  createProduct = async product => {
    try {
      await this.productsRepository.create<Product>(product);
      return true;
    } catch {
      throw new HttpException("Not authorized.", HttpStatus.EXPECTATION_FAILED);
    }
  };

  updateProduct = async product => {
    try {
      await this.productsRepository.update(product, {
        where: { id: product.id }
      });
      return true;
    } catch {
      throw new HttpException("Not authorized.", HttpStatus.EXPECTATION_FAILED);
    }
  };

  deleteProduct = async _id => {
    try {
      await this.productsRepository.destroy({
        where: { id: _id }
      });
      return true;
    } catch {
      throw new HttpException("Not authorized.", HttpStatus.EXPECTATION_FAILED);
    }
  };
}
