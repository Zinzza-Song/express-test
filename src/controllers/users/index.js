import { Router } from "express";
import { Userdto, CreateUserdto } from "./dto";

class UsersController {
  router;
  path = "/users";

  users = [
    {
      id: 1,
      firstname: "gildong",
      lastname: "hb",
      age: 30,
    },
  ];

  constructor() {
    this.router = Router();
    this.initial();
  }

  initial() {
    this.router.get("/", this.getUser.bind(this));
    this.router.get("/detail/:id/Totalname", this.getTotalname.bind(this));
    this.router.get("/detail/:id", this.getU.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }

  getUser(req, res, next) {
    try {
      const users = this.user.map((user) => new Userdto(user));
      res.status(200).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }

  getU(req, res, next) {
    try {
      const { id } = req.params;
      const targetuser = this.users.find((user) => user.id === Number(id));

      if (!targetuser) throw { status: 404, message: "사용자를 찾을 수없다." };

      const user = new Userdto(targetuser);

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  createUser(req, res, next) {
    try {
      const { firstname, lastname, age } = req.body;

      if (!firstname || !lastname)
        throw { status: 400, message: "이름이 없다" };

      const user = new CreateUserdto(firstname, lastname, age);
      const newuser = user.getNewuser();

      this.users.push(newuser);

      res.status(201).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }

  getTotalname(req, res, next) {
    try {
      const { id } = req.params;
      const targetUser = this.users.find((user) => user.id === Number(id));

      if (!targetUser) throw { status: 404, message: "사용자를 찾을 수없다." };

      const user = new Userdto(targetUser);

      res.status(200).json({ totalname: user.getTotalName() });
    } catch (err) {
      next(err);
    }
  }
}

const con = new UsersController();

export default con;
