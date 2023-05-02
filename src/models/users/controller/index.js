import { Router } from "express";
import { pagination } from "../../../middleware/pagination";
import { Userdto, CreateUserdto, UpdateUserdto } from "../dto";
import { UserService } from "../service";

class UsersController {
  router;
  path = "/users";
  userService;

  constructor() {
    this.router = Router(); //Router객체
    this.initial();
    this.userService = new UserService();
  }

  initial() {
    this.router.get("/", pagination, this.getUser.bind(this));
    this.router.get("/detail/:id", this.getU.bind(this));
    this.router.post("/", this.createUser.bind(this));
    this.router.post("/:id", this.updateUser.bind(this));
    this.router.post("/:id", this.deleteUser.bind(this));
  }

  async getUser(req, res, next) {
    try {
      const { users, cnt } = await this.userService.findUsers({
        skip: req.skip,
        take: req.take,
      });

      res
        .status(200)
        .json({ users: users.map((user) => new Userdto(user)), cnt });
    } catch (err) {
      next(err);
    }
  }

  async getU(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);

      res.status(200).json({ user: new Userdto(user) });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const createUserDto = new CreateUserdto(req.body);
      const newId = await this.userService.createUser(createUserDto);

      res.status(201).json({ id: newId });
    } catch (err) {
      next(err);
    }
  }
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateUserDto = new UpdateUserdto(req.body);

      await this.userService.updateUser(id, updateUserDto);

      res.status(204).json({}); //no content
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}
const con = new UsersController();
export default con;
