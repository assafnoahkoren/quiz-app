import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const apiService = {
  subjects: {
    getFullSubjectById: async (id: string) => {
      const res = await axios.get<{
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
      }>(`/api/v1/subjects/${id}/full`);
      return res.data;
    },

    getAllRootSubjects: async () => {
      const res = await axios.get<{
        id: string;
        name: string;
        description?: string;
        parentId?: string;
        createdAt: string;
      }>("/api/v1/subjects/root");
      return res.data;
    },
  },

  quizzes: {
    createQuiz: async (subjectId: string, config: QuizConfig = {}) => {
      const res = await axios.post<{
        id: string;
        subjectId: string;
        userId: string;
      }>(`/api/v1/quizzes/create`, { subjectId, config });
      return res.data;
    },
  },
};

type QuizConfig = {
    includeUnanswered?: boolean;
    includeCorrect?: boolean;
    includeIncorrect?: boolean;
    showCorrectAnswerAfterEachQuestion?: boolean;
}