import { observer } from "mobx-react-lite";
import { quizStore } from "../stores/QuizStore";
import './QuizPage.scss';

export const QuizPage = observer(() => {

  return <div className="quiz-page w-full h-full flex flex-col justify-between">
    <div className="upper-part">
      <div className="p-4 pb-0 text-xl opacity-50">
        #{quizStore.index + 1}
      </div>
      <div className="question-text text-xl font-bold p-4 pt-1">
        {quizStore.currentQuestion?.text}
      </div>
    </div>

    <div className="lower-part">
      <div className="p-4 flex flex-col gap-2">
        {quizStore.currentQuestion?.answers?.map((answer) => (
          <div
            className={`answer-button p-3 border-2 border-blue-500 rounded-lg ${quizStore.selectedAnswer === answer ? "answer-button-selected bg-blue-200" : ""}`}
            onClick={() => quizStore.selectAnswer(answer)}
          >
            {answer}
          </div>
        ))}
      </div>

      <div className="flex w-full justify-around items-center mb-4">
        <div className="px-8 opacity-50" onClick={() => quizStore.previousQuestion()}>הקודם</div>
        <div className="py-2 bg-blue-500 rounded-lg text-white text-lg font-bold flex justify-center items-center flex-1">בדוק</div>
        <div className="px-8 opacity-50" onClick={() => quizStore.nextQuestion()}>דלג</div>
      </div>
    </div>




  </div>;
});
