import { Router } from "express";

class UsersController {
  router;

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

  getUser(req, res) {
    res.status(200).json({ users: this.users });
  }

  getU(req, res) {
    const { id } = req.params;
    const user = this.users.find((user) => user.id === Number(id));

    res.status(200).json({ user });
  }

  createUser(req, res) {
    const { name, age } = req.body;

    this.users.push({
      id: new Date().getTime(),
      name,
      age,
    });

    res.status(201).json({ users: this.users });
  }
}

const con = new UsersController();

export default con;
