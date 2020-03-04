import { Injectable } from "@nestjs/common";
const jwt = require("jsonwebtoken");

@Injectable()
export class UserService {
  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        username: user.username,
        sub: user.username,
        exp: exp.getTime() / 1000
      },
      "SECRET"
    );
  }
}
