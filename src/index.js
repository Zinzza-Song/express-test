import express from "express";
import cors from "cors";
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let users = [
  {
    id: 1,
    name: "hb",
    age: 17,
  },
];

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

const day = new Date();
const day2 = dayjs(day).format("YYYY-MM-DD");
console.log({ day, day2 });

const pwd = "1234";
const hashpwd = bcrypt.hashSync(pwd, 10);
console.log({ hashpwd });

const token = jwt.sign("1234", "abcdifwfoiewg34ewgh46s");
console.log({ token });

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;

  users.push({
    id: new Date().getTime(),
    name,
    age,
  });

  res.status(201).json({ users });
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  console.log(req.params);

  const userIdx = users.findIndex((user) => user.id === Number(id));

  users[userIdx] = {
    id: users[userIdx].id,
    name: name ?? users[userIdx].name,
    age: age ?? users[userIdx].age,
  };

  res.status(204).json({ users });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const deleteUsers = users.filter((user) => user.id !== Number(id));
  users = deleteUsers;

  res.status(204).json({ users });
});

app.listen(8000, () => {
  console.log("서버 시작");
});
