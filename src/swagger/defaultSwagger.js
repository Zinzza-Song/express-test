const defaultSwagger = {
  openapi: "3.0.0",
  info: {
    title: "스웨거",
    description: "스웨거 사용",
    version: "1.0.0",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default defaultSwagger;
