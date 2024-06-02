import NiceModal from '@ebay/nice-modal-react';
import { quizStore } from '../../stores/QuizStore';
import { observer } from 'mobx-react-lite';
import { BarLoader } from 'react-spinners';


export const QuestionEditModal = observer(() => {
  const closeModal = (e: any) => {    
    if (e.currentTarget != e.target) return;
    NiceModal.remove('QuestionEditModal');
  }
  return <div onClick={closeModal} className='fixed z-50 left-0 top-0 w-full h-full flex justify-center items-center py-10 px-5 bg-[#00000050]'>
      <div className='w-full bg-white p-4 rounded-xl'>
        <div className='flex justify-between items-center mb-2'>
          <span>עריכת שאלה</span>
          <i className='fa-regular fa-times opacity-50' onClick={closeModal}></i>
        </div>
        <div>
          <div className='w-full h-[1px] bg-black opacity-20 mb-4'></div>
        </div>
        <div>
          <label  className="block mb-2 text-sm font-medium text-gray-900 ">שאלה</label>
          <textarea value={quizStore.currentQuestion.text} onChange={(e) => quizStore.currentQuestion.text = e.target.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          <br/>
          <label  className="block mb-2 text-sm font-medium text-gray-900 ">תשובות</label>
          {quizStore.currentQuestion.answers?.map((answer, index) => (
            <div className='flex items-center gap-2 mb-4'>
              <input checked={quizStore.currentQuestion.correctAnswer === answer} onClick={() => quizStore.currentQuestion.correctAnswer = answer} type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
              <textarea value={answer} className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                onChange={(e) => quizStore.currentQuestion.answers![index] = e.target.value}/>
            </div>
          ))}
          <br/>
          <div className="h-12 bg-blue-500 rounded-lg text-white text-lg font-bold flex justify-center items-center flex-1"
            onClick={() => quizStore.saveQuestion(quizStore.currentQuestion).then(() => NiceModal.remove('QuestionEditModal'))}>
            {quizStore.saveLoading ? <BarLoader color='white' /> : "שמור"}
          </div>
          
        </div>
      </div>
  </div>
})

NiceModal.register('QuestionEditModal', QuestionEditModal);
