import axios from "axios";
import { QuizConfig } from "@shared/types/QuizConfig.ts";
import { QuizQuestionAnswerInput } from "@shared/types/QuizQuestionAnswerInput.ts";
import { QuestionInput } from "@shared/types/QuestionInput.ts";
import { dataStore } from "../stores/DataStore.ts";
import { SubjectStats } from "@shared/types/SubjectStats.ts";

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
      const filter =
        dataStore.filterQuestionsByVisibility !== undefined
          ? `filterQuestionsByVisibility=${dataStore.filterQuestionsByVisibility}`
          : "";
      const res = await axios.post<ResponseType>(
        `/api/v1/questions/get-random-by-subjects?${filter}`,
        {
          subjectIds,
          amount,
          config,
        }
      );
      const questions = res.data.map(question => {
        question.answers = shuffleArray(question.answers || [])
        return question
      })
      return questions;
    },

    getMySubjectStats: async () => {
      type ResponseType = Record<string, SubjectStats>;
      const res = await axios.post<ResponseType>(
        `/api/v1/questions/my-subject-stats`
      );
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
      const res = await axios.post<ResponseType>(`/api/v1/questions/update`, {
        question: question,
      });
      return res.data;
    },

    createQuestions: async (questions: QuestionInput[]) => {
      type ResponseType = {
        count: number;
      };
      console.log(questions);
      const res = await axios.post<ResponseType>(`/api/v1/questions/create`, {
        questions: questions,
      });
      return res.data;
    },
  },
};

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
