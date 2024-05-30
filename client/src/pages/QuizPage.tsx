import { observer } from "mobx-react-lite";
import { quizStore } from "../stores/QuizStore";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import NiceModal from "@ebay/nice-modal-react";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { dataStore } from "../stores/DataStore";
import {authStore} from "../stores/AuthStore.ts";

export const QuizPage = observer(() => {
  const navigate = useNavigate();
  const clickNext = useCallback(() => {
    if (quizStore.currectQuestionState) {
      if (quizStore.atEnd) {
        navigate(-1);
      } else {
        quizStore.nextQuestion();
      }
    } else {
      if (!quizStore.selectedAnswer) return;
      quizStore.checkAnswer();
      quizStore.createAnswer(quizStore.selectedAnswer);
    }
  }, [navigate]);

  const editQuestion = useCallback(() => {
    NiceModal.show('QuestionEditModal').then(() => { })
  }, []);

  const swiperRef = useRef<SwiperClass>();

  const clickQuestionSquare = (index) => {
    quizStore.index = index;
  }

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(quizStore.index);
  }, [quizStore.index]);

  const squareColor = (id) => {
    if (quizStore.stateMap[id] === 'correct') {
      return 'bg-lime-500 text-white';
    } else if (quizStore.stateMap[id] === 'incorrect') {
      return 'bg-red-500 text-white';
    } else {
      return 'bg-blue-500 text-white';
    }

  }

  console.log('dataStore.flatSubjects', JSON.parse(JSON.stringify(dataStore.subjectById)));
  
  return <div className="quiz-page w-full h-full flex flex-col justify-between">
    <div className="upper-part">
      <div className="w-full mt-2 overflow-visible">
        <Swiper
          spaceBetween={10}
          slidesPerView={window.innerWidth / 40}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => swiperRef.current = swiper}
          centeredSlides
          style={{paddingTop: 6, paddingBottom: 6}}
        >
          {quizStore.questions.map((question, index) => (
            <SwiperSlide>
              <div className={`ms-2 ${squareColor(question.id)} w-8 h-8 rounded-lg flex justify-center items-center  font-bold ${quizStore.index === index ? 'scale-125' : 'scale-100'} transition-all`}
              onClick={() => clickQuestionSquare(index)}>
                {index + 1}
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
      <div className="flex justify-between items-center p-4 pb-0">
        <div className="text-xl opacity-50">
          #{quizStore.index + 1}          
        </div>
        <div className="font-bold" onClick={() => navigate(-1)}>
          חזרה
        </div>
      </div>
      <div className="px-4 text-lg opacity-50">
        {dataStore.subjectById[quizStore.currentQuestion?.subjectId]?.name}
      </div>
      <div className="question-text text-xl font-bold p-4 pt-1">
        {quizStore.currentQuestion?.text}
      </div>
      {!quizStore.currentQuestion?.text && <BarLoader color="var(--main-blue)" className="m-auto" />}
    </div>

    <div>
      <div className="lower-part-actions p-2 relative z-40">
        {authStore.hasRole('admin') && <div onClick={editQuestion} className="p-2 text-slate-500 flex gap-1 items-center">
          <i className="fa-regular fa-pencil me-2"></i>
          <span>
            עריכה
            <span className="text-xs ms-2">
              {quizStore.currentQuestion?.verified && '(נערך בעבר)'}
            </span>
          </span>

        </div>}
      </div>
      <div className="lower-part relative" style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
        <div className="w-full flex justify-center absolute bottom-full mb-4 left-0">
          {quizStore.currectQuestionState === 'correct' ? <i className="fa-regular fa-circle-check text-lime-500 text-5xl"></i> : null}
          {quizStore.currectQuestionState === 'incorrect' ? <i className="fa-regular fa-circle-xmark text-red-500 text-5xl"></i> : null}
        </div>
        <div className="p-4 flex flex-col gap-2">
          {quizStore.currentQuestion?.answers?.map((answer) => (
            <div
              className={`answer-button p-3 border-2 border-${quizStore.answerColor(answer)}-500 rounded-lg
            ${quizStore.selectedAnswer === answer || quizStore.currectQuestionState ? `answer-button-selected bg-${quizStore.answerColor(answer)}-200` : ""}
            ${quizStore.selectedAnswer === answer ? 'font-black' : ''}`}
              onClick={() => quizStore.selectAnswer(answer)}
            >
              {answer}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-around items-center pb-4">
          <div className="px-8 opacity-50" onClick={() => quizStore.previousQuestion()}>הקודם</div>
          <div className={`py-2 bg-blue-500 rounded-lg text-white text-lg font-bold flex justify-center items-center flex-1`}
            onClick={clickNext}>
            {quizStore.currectQuestionState ? (quizStore.atEnd ? "סיים" : "הבא") : "בדוק"}
          </div>
          <div className="px-8 opacity-50" onClick={() => quizStore.nextQuestion()}>דלג</div>
        </div>
      </div>
    </div>




  </div>;
});
