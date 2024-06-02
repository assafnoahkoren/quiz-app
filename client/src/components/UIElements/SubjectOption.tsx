import { useState } from "react";
import "./SubjectOption.scss";
import { SubjectType } from "../../types/subjectType";
import { useNavigate } from "react-router-dom";
import { quizStore } from "../../stores/QuizStore";

interface SubjectOptionProps {
  name: string;
  parentId?: string;
  containMoreSubjects?: boolean;
  subjects?: SubjectType[];
}

const SubjectOption: React.FC<SubjectOptionProps> = ({
  name,
  subjects,
}) => {
  
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const hideOrShow = () => {
    setIsHidden(!isHidden);
  };

  const onClickSubject = (subjectIds: string[]) => {
    navigate(`/quiz`);
    quizStore.startQuiz(subjectIds);
  };

  return (
    <>
      {subjects ? (
        <>
          <div className="SubjectOption flex w-full items-center justify-center">
            <div className={`subject-option_container more flex-1`} onClick={() => onClickSubject(subjects.map((subject) => subject.id))}>
              <div className="subject-option_name">{name}</div>
              <div className="subject-option_left">
              </div>
            </div>
            <div className="subject-option_expand flex items-center justify-center rounded-e-lg bg-[--global-subject-color] h-[--height-button] px-2 gap-2 text-white" onClick={hideOrShow}>
              <div className="subject-option_subjcount">
                {subjects.length} תתי נושאים{" "}
              </div>
              <i className={`fa-regular fa-circle-chevron-${isHidden ? "down" : "up"}`}></i>
            </div>
          </div>
          {subjects.map((curSubject) => {
            return (
              <div
                onClick={() => onClickSubject([curSubject.id])}
                className={`SubSubjectOption w-full border-2 border-[--global-subject-color] p-2 mt-2 rounded-lg ${isHidden ? "hidden" : ""}`}
              >
                <div className="subject-option_name flex justify-between w-full gap-2">
                  <div className="truncate">
                    {curSubject.name}
                  </div>
                  <div className="w-max whitespace-nowrap font-normal">
                    {curSubject._count.Questions}
                    &nbsp;
                    <span className="text-sm">
                      שאלות
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </>
      ) : (
        <div className={`subject-option_container more`} onClick={hideOrShow}>
          <div className="subject-option_name">{name}</div>
        </div>
      )}
    </>
  );
};

export default SubjectOption;
