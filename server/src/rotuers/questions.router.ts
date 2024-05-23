import express from "express";
import { db } from "../db";
import { QuizConfig } from "@shared/types/QuizConfig";

    export const questions = express.Router();

questions.post("/get-random-by-quiz/:quizId", async (req, res) => {
    const { subjectId, config } = req.body;
    const { quizId } = req.params;
    const result = await db.quiz.create({
        data: {
            subjectId: subjectId,
            userId: req.currentUserId,
            config: config
        },
        select: {
            id: true,
            subjectId: true,
            userId: true
        }
    });
    res.json(result);
});
