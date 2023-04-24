import { Router } from "express";

class UsersController {
  router;
  path = "/users";

  users = [
    {
      id: 1,
      name: "hb",
      age: 30,
    },
  ];

  constructor() {
    this.router = Router();
    this.initial();
  }

  initial() {
    this.router.get("/", this.getUser.bind(this));
    this.router.get("/detail/:id", this.getU.bind(this));
    this.router.post("/", this.createUser.bind(this));
  }

  getUser(req, res, next) {
    try {
      res.status(200).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }

  getU(req, res, next) {
    try {
      const { id } = req.params;
      const user = this.users.find((user) => user.id === Number(id));

      if (!user) throw { status: 404, message: "사용자를 찾을 수없다." };

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  createUser(req, res, next) {
    try {
      const { name, age } = req.body;

      this.users.push({
        id: new Date().getTime(),
        name,
        age,
      });

      res.status(201).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }
}

const con = new UsersController();

export default con;
