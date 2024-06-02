import NiceModal from "@ebay/nice-modal-react";
import Button from "../UIElements/Button";

export const AddQuestionsModal = () => {
  const closeModal = (e: any) => {    
    if (e.currentTarget != e.target) return;
    NiceModal.remove('AddQuestionsModal');
  }
  return (
    <div onClick={closeModal} className='fixed z-50 left-0 top-0 w-full h-full flex justify-center items-center py-10 px-5 bg-[#00000050]'>
      <div className='w-full h-[75%] bg-slate-50 p-4 rounded-xl flex justify-between'>
        <div className='w-full flex-col h-full mb-2 flex justify-center items-center'>
          <h1>הוספת שאלות</h1>
          <textarea className='w-full h-full border border-black rounded-[5px]' dir='ltr'></textarea>
        <Button>הוספת שאלות</Button>
        </div>
        <i className='fa-regular fa-times opacity-50' onClick={closeModal}></i>
      </div>
  </div>
  );
};

NiceModal.register("AddQuestionsModal", AddQuestionsModal);
