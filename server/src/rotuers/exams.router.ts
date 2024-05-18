import express from "express";

export const exams = express.Router();

exams.get("/", (req, res) => {
  res.send("exams");
});