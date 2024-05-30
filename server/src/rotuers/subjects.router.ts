import express from "express";
import { db } from "../db";

export const subjects = express.Router();

subjects.get("/root", async (req, res) => {
  const subjects = await db.subject.findMany();
  res.json(subjects);
});


subjects.get("/:subjectId/full", async (req, res) => {
  const { subjectId } = req.params;
  const subject = await db.subject.findUnique({
    where: {
      id: subjectId
    },
    include: {
      Subjects: {
        include: {
          Subjects: true
        }
      }
    }
  });
  res.json(subject);
});
