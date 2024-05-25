import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";
import { useEffect, useRef, useState } from "react";
import SubjectOption from "../components/UIElements/SubjectOption";

import "./SubjectPage.scss";
import Button from "../components/UIElements/Button";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/UIElements/Loading";

const SubjectPage = observer(() => {
  const { subjectId } = useParams();
  // const [selectedSubject, setSelectedSubject] = useState();
  const backgroundColor = useRef<string | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!subjectId) return;
      await dataStore.getSubjectById(subjectId);
      dataStore.setSelectedSubject(subjectId);
      // setSelectedSubject(
      //   dataStore.subjectsMap[subjectId].subject
      // );
      
    };
    fetchSubject();
  }, [subjectId]);

  const selectedSubject = dataStore.subjectsMap[dataStore.selectedSubjectId];
  backgroundColor.current = selectedSubject?.subject ? localStorage.getItem(selectedSubject.subject.name): null;
  document.documentElement.style.setProperty('--global-subject-color', backgroundColor.current);
  return (
    <>
      {selectedSubject?.isLoading && <Loading></Loading>}
      {selectedSubject?.subject && <div className="page-wraper mt-4">
        <div className="subject-page_header">
          <div className="subject-page_header-top mb-2">
            <h3 className="main-subject-title">
              {selectedSubject.subject.name}
            </h3>
            <Link to="/homepage">
              <div className="back-to-main-button">חזרה לראשי</div>
            </Link>
          </div>
          <Button inverse bold>
            התחל קוויז כללי
          </Button>
          {/* what should i do if i have similar rules on different elements? */}
          <div className="back-to-main-button">או בחר נושא למטה</div>
          {/* what should i do if i have single rule? */}
          <div className="subjects-tree-title">עץ נושאים</div>
        </div>
        <div className="sub-subjects-container">
          {selectedSubject &&
            selectedSubject.subject.Subjects.map((subject) => {
              if (subject.Subjects.length > 0) {
                return (
                  <SubjectOption
                    key={subject.id}
                    name={subject.name}
                    subjects={subject.Subjects}
                  />
                );
              } else {
                return <SubjectOption key={subject.id} name={subject.name} />;
              }
            })}
        </div>
      </div>}
    </>

  );
});

export default SubjectPage;
