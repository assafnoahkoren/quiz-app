import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import "express-async-errors";
import jwt from "jwt-simple";

const db = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({
    msg: "Server is up and running!",
  });
});

// Create a new user in the users table
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.user.create({
    data: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  res.json(user);
});

// Flow:
// 1. Gets email and password
// 2. Check if user exists in the database with the same password
// 3. If user exists, return a jwt
app.get("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.user.findFirst({
    where: {
      email: { equals: email },
      password: { equals: password },
    },
    select: {
      id: true,
      email: true,
    },
  });
  const token = jwt.encode(user, process.env.JWT_SECRET!);
  res.json({
    token: token,
    user: user,
  });
});

app.use("/api", (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token);

  let payload;
  try {
    payload = jwt.decode(token!, process.env.JWT_SECRET!);
  } catch (error) {
    res.json({ error });
    return;
  }
  console.log("payload", payload);

  if (!payload) {
    res.json({ error: "No valid token" });
    return;
  }

  next();
});

//HOME PAGE

//get all subject containing partial string that's in 'name' query, if query is empty get all subjects.
app.get("/api/subjects", async (req, res) => {
  const name = req.query.name as string;
  if (name) {
    const subjects = await db.subject.findMany({
      where: {
        name: { contains: name },
      },
    });
    console.log("name", name);
    res.json(subjects);
  } else {
    const allSubjects = await db.subject.findMany();
    res.json(allSubjects);
  }
});

//SUBJECT PAGE

//get subject by specific id
app.get("/api/subjects/:subjectId", async (req, res) => {
  const { subjectId } = req.params;

  try {
    await db.subject.findUnique({
      where: {
        id: subjectId,
      },
      include: {
        Question: true,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//EXAM PAGE

//create a new exam
app.post("/api/create-exam", async (req, res) => {
  const { subjectId, userId } = req.body;
  const questions = await db.question.findMany({
    where: {
      subjectId: subjectId,
    },
  });
  const createdExam = await db.exam.create({
    data: {
      subjectId: subjectId,
      userId: userId,
      questions: {
        connect: questions.map((question) => ({ id: question.id })),
      },
    },
    include: {
      questions: true,
    },
  });
  res.json(createdExam);
});

//get random question in a specific subject
app.get("/api/subjects/:subjectId/random", async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await db.subject.findUnique({
      where: {
        id: subjectId,
      },
      include: {
        Question: true,
      },
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const questions = subject.Question;
    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ error: "No questions found for this subject" });
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    res.json(randomQuestion);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//@ts-ignore
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code).send(error.message);
});

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
