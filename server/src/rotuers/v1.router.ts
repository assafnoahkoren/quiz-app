import express from "express";
import { exams } from "./exams.router";
import { validUser } from "../middlewares/auth.middleware";

export const v1 = express.Router();
v1.use("/", validUser);
v1.use("/exams", exams);