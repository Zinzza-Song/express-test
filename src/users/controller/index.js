import { Router } from "express";
import { Userdto, CreateUserdto } from "../dto";
import { pagination } from "../../middleware/pagination";
import { UserService } from "../service";

class UsersController {
  router;
  path = "/users";
  userService;

  constructor() {
    this.router = Router();
    this.initial();
    this.userService = new UserService();
  }

  initial() {
    this.router.get("/", this.getUser.bind(this));
    this.router.get("/detail/:id", this.getU.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }

  async getUser(req, res, next) {
    try {
      const { users, cnt } = this.userService.findUsers({
        skip: req.skiop,
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
      const data = req.body;
      const newUserId = await this.userService.CreateUserdto(data);

      res.status(201).json({ id: newUserId });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      await this.userService.updateUser(id, data);

      res.status(200);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      res.status(200);
    } catch (err) {
      next(err);
    }
  }
}

const con = new UsersController();

export default con;
