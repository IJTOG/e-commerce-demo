import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable, Inject } from "@nestjs/common";
import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "./user.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject("USERS_REPOSITORY") private readonly usersRepository: typeof User
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
      const decoded: any = jwt.verify(authHeaders, "SECRET");
      const user = await this.usersRepository.findOne<User>({
        where: {
          username: decoded.username
        },
        order: [["createdAt", "DESC"]]
      });

      if (!user) {
        throw new HttpException("User not found.", HttpStatus.UNAUTHORIZED);
      }

      req.user = user.dataValues;
      next();
    } else {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
