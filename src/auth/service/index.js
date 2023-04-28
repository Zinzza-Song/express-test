import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { CreateUserdto } from "../../users/dto";
import { UserService } from "../../users/service";

dotenv.config();

export class AuthService {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  async register(props) {
    const isExist = await this.userService.checkEmail(props.email);

    if (isExist) throw { status: 400, message: "이미 존재하는 이메일입니다." };

    const newId = await this.userService.CreateUserdto(
      new CreateUserdto({
        ...props,
        password: await props.hashPassword(),
      })
    );

    const accessToken = jwt.sign({ id: newId }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign({ id: newId }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });
    console.log({ accessToken, refreshToken });

    return { accessToken, refreshToken };
  }
}
