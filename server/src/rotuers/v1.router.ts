import express from "express";
import { exams } from "./exams.router";

export const v1 = express.Router();

v1.use("/exams", exams);