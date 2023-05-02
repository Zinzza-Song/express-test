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
    if (isExist) throw { status: 400, message: "이미 존재하는 이메일입니다" };

    const newId = await this.userService.createUser(
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

  async login(props) {
    const isExist = await this.userService.checkEmail(props.email);
    if (!isExist) throw { status: 404, message: "사용자가 존재하지 않는다" };

    const isCorrect = await this.userService.comparePassword(props.password);
    if (!isCorrect) throw { status: 404, message: "비밀번호를 잘못 입력했다." };

    const accessToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });

    const refreshToken = jwt.sign({ id: isExist.id }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(accessToken, refreshToken) {
    const accessTokenPayload = jwt.verify(accessToken, process.env.JWT_KEY, {
      ignoreExpiration: true,
    });
    const refreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_KEY);

    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw { status: 403, message: "권한이 없다." };

    const user = await this.userService.findUserById(accessTokenPayload.id);

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "14d",
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
