import * as Swaggers from "../controllers/swagger";
import defaultSwagger from "./defaultSwagger";

console.log(Swaggers);

// 스웨거에 등록한 json
export const swaggerDocs = {
  ...defaultSwagger,
};

//스웨거에 등록
export const options = {
  swaggerOptions: {
    url: "/swagger.json",
  },
};
