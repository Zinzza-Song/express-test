import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.listen(8000, () => {
  console.log("서버 시작");
});
