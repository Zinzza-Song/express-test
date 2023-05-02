import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import { swaggerDocs, options } from "./swagger";
import swaggerUI from "swagger-ui-express";
import database from "./database";
import { Controllers } from "./models";
import { jwtAuth } from "./middleware/jwtAuth";

(async () => {
  const app = express(); //app :express 객체 => 서버 일 처리
  await database.$connect();

  app.use(cors());
  app.use(helmet()); //미들웨어로 등록함
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "700mb" }));

  Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
  });

  app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
  });

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, options));

  //라우터 등록(use) -> 미들웨어 등록
  //app.use('/users', UsersController.router);

  app.get("/", (req, res) => {
    res.send("node.js 재밌다");
  });

  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "서버에서 에러 발생함" });
  });

  app.listen(8000, () => {
    console.log("서버 시작");
  });
})();
