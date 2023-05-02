import { AuthController } from "./auth";
import { UserController, UserSwagger } from "./users";

export const Swaggers = {
  UserSwagger,
};

export const Controllers = [AuthController, UserController];
