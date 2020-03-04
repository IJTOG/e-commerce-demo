import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { User } from "./user.entity";
import * as sha1 from "sha1";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("USERS_REPOSITORY") private readonly usersRepository: typeof User
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne<User>({
      where: {
        username: username
      },
      order: [["createdAt", "DESC"]]
    });
    if (user && user.password === sha1(password)) {
      return user.dataValues;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
