import axios from "axios";
import { QuizConfig } from "@shared/types/QuizConfig.ts";
import { QuizQuestionAnswerInput } from "@shared/types/QuizQuestionAnswerInput.ts";
import { QuestionInput } from "@shared/types/QuestionInput.ts";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const ApiService = {
  subjects: {
    getFullSubjectById: async (id: string) => {
      type ResponseType = {
        id: string;
        name: string;
        description: string;
        parentId?: string;
        createdAt: string;
        Subjects: Array<{
          id: string;
          name: string;
          description?: string;
          parentId: string;
          createdAt: string;
          Subjects: Array<{
            id: string;
            name: string;
            description?: string;
            parentId: string;
            createdAt: string;
          }>;
        }>;
      };
      const res = await axios.get<ResponseType>(`/api/v1/subjects/${id}/full`);
      return res.data;
    },

    getAllRootSubjects: async () => {
      type ResponseType = {
        id: string;
        name: string;
        description?: string;
        parentId?: string;
        createdAt: string;
      };
      const res = await axios.get<ResponseType>("/api/v1/subjects/root");
      return res.data;
    },
  },

  quizzes: {
    createQuiz: async (subjectId: string, config: QuizConfig = {}) => {
      type ResponseType = {
        id: string;
        subjectId: string;
        userId: string;
      };
      const res = await axios.post<ResponseType>(`/api/v1/quizzes/create`, {
        subjectId,
        config,
      });
      return res.data;
    },
  },

  questions: {
    getRandomBySubjects: async (
      subjectIds: string[],
      amount: number = 1,
      config: QuizConfig = {}
    ) => {
      type ResponseType = Array<{
        answers: Array<string>;
        text: string;
        id: string;
        correctAnswer: string;
        subjectId: string;
        verified: boolean;
      }>;
      const res = await axios.post<ResponseType>(`/api/v1/questions/get-random-by-subjects`, {
        subjectIds,
        amount,
        config,
      });
      return res.data;
    },

    createAnswer: async ({
      answer,
      isCorrect,
      sequence,
      questionId,
      quizId,
      subjectId,
    }: QuizQuestionAnswerInput) => {
      type ResponseType = {
        id: string;
      };
      const res = await axios.post<ResponseType>(
        `/api/v1/questions/create-answer`,
        {
          questionAnswer: {
            answer,
            isCorrect,
            sequence,
            questionId,
            quizId,
            subjectId,
          },
        }
      );
      return res.data;
    },

    
    updateQuestion: async (question: QuestionInput) => {
      type ResponseType = {
        id: string;
      };
      const res = await axios.post<ResponseType>(
        `/api/v1/questions/update`,
        {
          question: question,
        }
      );
      return res.data;
    },

    createQuestions: async (questions: QuestionInput[]) => {
      type ResponseType = {
        count: number;
      };
      console.log(questions);
      const res = await axios.post<ResponseType>(
        `/api/v1/questions/create`,
        {
          questions: questions,
        }
      );
      return res.data;
    },
    
  },
};
