import { QuestionInput } from "@shared/types/QuestionInput";
import { QuizConfig } from "@shared/types/QuizConfig";
import { makeAutoObservable } from "mobx";
import { ApiService } from "../services/api-service";
import { makePersistable } from "mobx-persist-store";

// This store will manage the authentication state of the user
class QuizStore {
  subjectIds: string[] = [];
  config: QuizConfig = {};
  questions: QuestionInput[] = [];
  index = 0;
  selectedAnswerMap: Record<string, string> = {};
  stateMap: Record<string, "correct" | "incorrect" | undefined> = {};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "QuizStore",
      properties: [
        "subjectIds",
        "config",
        "questions",
        "index",
        "selectedAnswer",
      ],
      storage: window.localStorage,
    });
  }

  async startQuiz(subjectIds: string[]) {
    this.subjectIds = subjectIds;
    this.questions = [];
    this.index = 0;
    this.selectedAnswerMap = {};
    this.stateMap = {};
    const questions = await ApiService.questions.getRandomBySubjects(
      subjectIds
    );
    this.questions = shuffleArray(questions);
  }

  get currentQuestion() {
    return this.questions[this.index];
  }

  selectAnswer(answer: string) {
    if (this.selectedAnswer) return;
    this.selectedAnswerMap[this.currentQuestion.id] = answer;
  }

  get selectedAnswer() {
    return this.selectedAnswerMap[this.currentQuestion.id];
  }

  get currectQuestionState() {
    return this.stateMap[this.currentQuestion?.id];
  }

  nextQuestion() {
    if (this.index >= this.questions.length - 1) return;
    this.index++;
  }

  previousQuestion() {
    if (this.index === 0) return;
    this.index--;
  }

  checkAnswer() {
    if (!this.selectedAnswer) return;
    const isCorrect =
      this.selectedAnswer === this.currentQuestion.correctAnswer;
    this.stateMap[this.currentQuestion.id] = isCorrect
      ? "correct"
      : "incorrect";
  }

  createAnswer(answer: string) {
    const question = this.currentQuestion;
    ApiService.questions.createAnswer({
      answer: answer,
      isCorrect: this.stateMap[this.currentQuestion.id] === "correct",
      questionId: question.id,
      subjectId: question.subjectId,
      sequence: this.index,
    });
  }

  answerColor(answer: string) {
    if (this.currectQuestionState) {
      return this.currentQuestion.correctAnswer === answer ? "green" : "red";
    } else {
      return "blue";
    }
  }

  get atEnd() {
    return this.index >= this.questions.length - 1;
  }
}

export const quizStore = new QuizStore();

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
