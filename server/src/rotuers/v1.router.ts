import express from "express";
import { validUser } from "../middlewares/auth.middleware";
import { quizzes } from "./quizzes.router";
import { subjects } from "./subjects.router";

export const v1 = express.Router();
v1.use("/", validUser);
v1.use("/quizzes", quizzes);
v1.use("/subjects", subjects);

