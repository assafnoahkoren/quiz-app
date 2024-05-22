import { useEffect, useState } from "react";
import "./SubjectOption.scss";
import { subjectType } from "../../types/subjectType";
import { dataStore } from "../../stores/DataStore";
import { observer } from "mobx-react-lite";

interface SubjectOptionProps {
  name: string;
  parentId?: string;
  containMoreSubjects?: boolean;
  subjects?: subjectType[];
}

const SubjectOption: React.FC<SubjectOptionProps> = observer(
  ({ name, subjects }) => {
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
      console.log(dataStore.isSearching);
      dataStore.isSearching ? setIsHidden(false) : setIsHidden(true);
    }, [dataStore.isSearching]);
// why only when adding dataStore.isSearching to the useEffect dependencies it working? 
// the observer shouldnt listen and render after any change?

    const toggleHidden = () => {
      setIsHidden(!isHidden);
    };

    return (
      <>
        {subjects ? (
          <>
            <div
              className={`subject-option_container more`}
              onClick={toggleHidden}
            >
              <div className="subject-option_name">{name}</div>
              <div className="subject-option_left">
                <div className="subject-option_subjcount">
                  {subjects.length} תתי נושאים{" "}
                </div>
                {isHidden ? (
                  <div className="subject-option_expand">/\</div>
                ) : (
                  <div className="subject-option_expand">\/</div>
                )}
              </div>
            </div>
            {subjects.map((curSubject) => {
              return (
                <div
                  key={curSubject.id}
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
          <div className={`subject-option_container more`} onClick={toggleHidden}>
            <div className="subject-option_name">{name}</div>
          </div>
        )}
      </>
    );
  }
);

export default SubjectOption;
