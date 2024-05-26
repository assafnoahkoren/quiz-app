import { QuestionInput } from "@shared/types/QuestionInput";
import { QuizConfig } from "@shared/types/QuizConfig";
import {  makeAutoObservable } from "mobx";
import { ApiService } from "../services/api-service";
import { makePersistable } from "mobx-persist-store";

// This store will manage the authentication state of the user
class QuizStore {
  subjectIds: string[] = [];
  config: QuizConfig = {};
  questions: QuestionInput[] = [];
  index = 0;
  selectedAnswer: string = "";


  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "QuizStore",
      properties: ["subjectIds", "config", "questions", "index", "selectedAnswer"],
      storage: window.localStorage,
    });
  }

  async startQuiz(subjectIds: string[]) {
    const questions = await ApiService.questions.getRandomBySubjects(subjectIds);
    this.subjectIds = subjectIds;
    this.questions = questions;
    this.index = 0;
    this.selectedAnswer = "";
  }

  get currentQuestion() {
    if (this.index >= this.questions.length) {
      this.index = this.questions.length - 1;
    } else if (this.index < 0) {
      this.index = 0;
    }
    return this.questions[this.index];
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  createAnswer(answer: string) {
    const question = this.currentQuestion;
    ApiService.questions.createAnswer({
      answer: answer,
      isCorrect: answer === question.correctAnswer,
      questionId: question.id,
      subjectId: question.subjectId,
      sequence: this.index,
    })
  }

  nextQuestion() {
    if (this.index >= this.questions.length - 1) return;
    this.index++;
  }

  previousQuestion() {
    if (this.index === 0) return;
    this.index--;
  }



}

export const quizStore = new QuizStore();
