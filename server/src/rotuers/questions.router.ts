import express, { Request } from "express";
import { db } from "../db";
import { QuizConfig } from "@shared/types/QuizConfig";
import { Prisma } from "@prisma/client";

export const questions = express.Router();

type GetRandomBySubjectReq = Request<
  {},
  {},
  { subjectIds: string[]; config: QuizConfig; amount: number }
>;
questions.post(
  "/get-random-by-subjects",
  async (req: GetRandomBySubjectReq, res) => {
    const { subjectIds, config, amount } = req.body;
    const questionsCount = await db.question.count({
      where: {
        subjectId: {
          in: subjectIds,
        },
      },
    });

    const questions = await db.question.findMany({
      where: {
        subjectId: {
          in: subjectIds,
        },
      },
      select: {
        answers: true,
        text: true,
        id: true,
        correctAnswer: true,
        subjectId: true,
        verified: true,
      },
    });

    res.json(questions);
  }
);

type UpdateQuestionReq = Request<
  {},
  {},
  { question: Prisma.QuestionUpdateInput }
>;
questions.post("/update", async (req: UpdateQuestionReq, res) => {
  if (!req.currentUserRoles?.includes("admin")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { question } = req.body;

  if (!question.id) {
    return res.status(400).json({ error: "Question id is required" });
  }
  const result = await db.question.update({
    where: {
      id: question.id as string,
    },
    data: question,
  });
  res.json(result);
});


type CreateAnserReq = Request<
  {},
  {},
  { questionAnswer: Prisma.QuizQuestionAnswerUncheckedCreateInput }
>;
questions.post("/create-answer", async (req: CreateAnserReq, res) => {
  const { questionAnswer } = req.body;
  
  const result = await db.quizQuestionAnswer.create({
    data: {
      userId: req.currentUserId,
      answer: questionAnswer.answer,
      isCorrect: questionAnswer.isCorrect,
      sequence: questionAnswer.sequence,
      questionId: questionAnswer.questionId,
      quizId: questionAnswer.quizId,
      subjectId: questionAnswer.subjectId,
    },
    select: {
      id: true
    }
  });

  res.json(result);
});
