export type QuizQuestionAnswerInput = {
  answer: string;
  isCorrect: boolean;
  sequence: number;
  questionId: string;
  quizId: string;
  subjectId: string;
}