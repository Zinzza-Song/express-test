import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";

import { swaggerDocs, options } from "./swagger";
import Controllers from "./controllers";
import database from "./database";

dotenv.config();

const password = "12345";

async () => {
  const app = express();
  await database.$connect();

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

  app.listen(8000, () => {
    console.log("서버 시작");
  });
};
