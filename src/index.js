import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import { swaggerDocs, options } from "./swagger";
import swaggerUI from "swagger-ui-express";

import Controllers from "./controllers";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

Controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "서버에서 에러 발생함" });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, options));

app.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocs);
});

// app.get("/", (req, res) => {
//   res.send("Express Server");
// });

// app.get("/users", (req, res) => {
//   res.status(200).json({ users });
// });

// app.post("/users", (req, res) => {
//   const { name, age } = req.body;

//   users.push({
//     id: new Date().getTime(),
//     name,
//     age,
//   });

//   res.status(201).json({ users });
// });

// app.patch("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, age } = req.body;
//   console.log(req.params);

//   const userIdx = users.findIndex((user) => user.id === Number(id));

//   users[userIdx] = {
//     id: users[userIdx].id,
//     name: name ?? users[userIdx].name,
//     age: age ?? users[userIdx].age,
//   };

//   res.status(204).json({ users });
// });

// app.delete("/users/:id", (req, res) => {
//   const { id } = req.params;

//   const deleteUsers = users.filter((user) => user.id !== Number(id));
//   users = deleteUsers;

//   res.status(204).json({ users });
// });

app.listen(8000, () => {
  console.log("서버 시작");
});
