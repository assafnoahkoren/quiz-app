import { useState } from "react";
import "./SubjectOption.scss";
import { subjectType } from "../../types/subjectType";

interface SubjectOptionProps {
  name: string;
  parentId?: string;
  containMoreSubjects?: boolean;
  subjects?: subjectType[];
}

const SubjectOption: React.FC<SubjectOptionProps> = ({
  name,
  subjects,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const hideOrShow = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      {subjects ? (
        <>
          <div className={`subject-option_container more`} onClick={hideOrShow}>
            <div className="subject-option_name">{name}</div>
            <div className="subject-option_left">
              <div className="subject-option_subjcount">
                {subjects.length} תתי נושאים{" "}
              </div>
              <div className="subject-option_expand">/\</div>
            </div>
          </div>
          {subjects.map((curSubject) => {
            return (
              <div
                className={`subject-option_container ${
                  isHidden ? "hidden" : ""
                }`}
              >
                <div className="subject-option_name">{curSubject.name}</div>
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
