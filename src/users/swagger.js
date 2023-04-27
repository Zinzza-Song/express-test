export const getUserSwagger = {
  "/detail/:id": {
    get: {
      tags: ["User"],
      summary: "사용자 상세 조회",
      parameters: [
        {
          in: "path",
          required: true,
          name: "id",
          schema: {
            type: "number",
          },
        },
      ],
      response: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      name: {
                        type: "string",
                      },
                      age: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getUsersSwagger = {
  "/detail/:id": {
    post: {
      tags: ["User"],
      summary: "사용자 상세 조회",
      parameters: [
        {
          in: "path",
          required: true,
          name: "id",
          schema: {
            type: "number",
          },
        },
      ],
      response: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      name: {
                        type: "string",
                      },
                      age: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
