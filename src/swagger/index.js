import * as Swaggers from "../controllers/swagger";
import defaultSwagger from "./defaultSwagger";

console.log(Swaggers);

const { paths } = Object.values(Swaggers).reduce(
  (acc, apis) => {
    console.log("apis", apis);
    const APIs = Object.values(apis).map((api) => {
      console.log(api);
      return { ...api };
    });
    APIs.forEach((api) => {
      const key = Object.keys(api)[0];
      console.log(key);
      if (!acc.paths[key]) {
        acc.paths = {
          ...acc.paths,
          ...api,
        };
      } else {
        acc.paths[key] = {
          ...acc.paths[key],
          ...api[key],
        };
      }
    });
    console.log(acc);
    console.log(APIs);

    return acc;
  },
  { paths: {} }
);

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
