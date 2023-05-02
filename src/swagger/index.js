import defaultSwagger from "./defaultSwagger";
import { UserSwagger } from "../models";

const Swaggers = {
  ...UserSwagger,
};

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
    return acc;
  },

  { paths: {} }
);

//스웨거에 등록한 json
export const swaggerDocs = {
  ...defaultSwagger,
  paths,
};

//스웨거에 등록
export const options = {
  swaggerOptions: {
    url: "/swagger.json",
  },
};
