import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import "express-async-errors";
import jwt from "jwt-simple";
import cors from "cors";
import { v1 } from "./rotuers/v1.router";
import { db } from "./db";

declare global {
  namespace Express {
    interface Request {
      currentUserId: string
      currentUserRoles: string[]
    }
  }
}


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1', v1)

app.get("/api", (req, res) => {
  res.json({
    msg: "Server is up and running!",
  });
});

// Create a new user in the users table
app.post("/auth/register", async (req, res) => {
  const { email, password, name } = req.body;

  const user = await db.user.create({
    data: {
      email: email,
      password: password,
      name: name,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
    },
  });

  const token = jwt.encode(user, process.env.JWT_SECRET!);
  res.json({
    token: token,
    user: user,
  });
});

// Flow:
// 1. Gets email and password
// 2. Check if user exists in the database with the same password
// 3. If user exists, return a jwt
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.user.findFirst({
    where: {
      email: { equals: email },
      password: { equals: password },
    },
    select: {
      id: true,
      email: true,
      roles: true,
    },
  });
  if (user) {
    const token = jwt.encode(user, process.env.JWT_SECRET!);
    res.json({
      token: token,
      user: user,
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});


//HOME PAGE

//get all subject containing partial string that's in 'name' query, if query is empty get all subjects.
app.get("/api/subjects", async (req, res) => {
  const name = req.query.name as string;
  const where: Prisma.SubjectWhereInput = {};

  if (name) {
    where.name = { contains: name };
  }

  const subjects = await db.subject.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(subjects);
});

//SUBJECT PAGE

//get subject by specific id
app.get("/api/subjects/:subjectId", async (req, res) => {
  const { subjectId } = req.params;

  const subject = await db.subject.findUnique({
    where: {
      id: subjectId,
    },
    include: {
      _count: {
        select: {
          Questions: true,
        },
      },
      Subjects: {
        include: {
          _count: {
            select: {
              Questions: true,
            },
          },
          Subjects: {
            include: {
              _count: {
                select: {
                  Questions: true,
                },
              },
              Subjects: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(subject);
});

// QUIZ PAGE


//get random question in a specific subject
app.get("/api/subjects/:subjectId/random", async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await db.subject.findUnique({
      where: {
        id: subjectId,
      },
      include: {
        Questions: true,
      },
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const questions = subject.Questions;
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
// app.use((error, req, res, next) => {
//   if (res.headersSent) {
//     return next(error);
//   }
//   res.status(error.code).send(error.message);
// });

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//@ts-ignore
function buildRecursiveInclude(depth: number) {
  if (depth === 0) return {};
  return {
    include: {
      Subjects: buildRecursiveInclude(depth - 1),
    },
  };
}
