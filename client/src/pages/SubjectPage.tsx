import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";
import { useCallback, useEffect, useRef, useState } from "react";
import SubjectOption from "../components/UIElements/SubjectOption";

import "./SubjectPage.scss";
import Button from "../components/UIElements/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/UIElements/Loading";
import { quizStore } from "../stores/QuizStore";
import { SubjectType } from "../types/subjectType";

const SubjectPage = observer(() => {
  const navigate = useNavigate()
  const { subjectId } = useParams();
  // const [selectedSubject, setSelectedSubject] = useState();
  // const backgroundColor = useRef<string | null>(null);

  useEffect(() => {
      if (!subjectId) return;
      dataStore.setSelectedSubject(subjectId);
  }, [subjectId]);


  const selectedSubject = dataStore.subjectsMap[dataStore.selectedSubjectId];

  const startQuiz = () => {
    const allIds = flattenSubjectIds(JSON.parse(JSON.stringify(selectedSubject)).subject);
    quizStore.startQuiz(allIds);
    navigate('/quiz')
    
  };
  // backgroundColor.current = selectedSubject?.subject ? localStorage.getItem(selectedSubject.subject.name) : null;
  // document.documentElement.style.setProperty('--global-subject-color', backgroundColor.current); 
  return (
    <>
      {selectedSubject?.isLoading && <Loading></Loading>}
      {selectedSubject?.subject && <div className="page-wrapper px-4">
        <div className="subject-page_header">
          <div className="subject-page_header-top mb-2">
            <h3 className="main-subject-title">
              {selectedSubject.subject.name}
            </h3>
            <Link to="/home">
              <div className="back-to-main-button">חזרה לראשי</div>
            </Link>
          </div>
          <Button inverse bold onClick={startQuiz}>
            התחל קוויז כללי
          </Button>
          {/* what should i do if i have similar rules on different elements? */}
          <div className="back-to-main-button">או בחר נושא למטה</div>
          {/* what should i do if i have single rule? */}
          <div className="subjects-tree-title">עץ נושאים</div>
        </div>
        <div className="sub-subjects-container">
          {selectedSubject &&
            selectedSubject.subject.Subjects.map((subject) => (
              <SubjectOption
                key={subject.id}
                name={subject.name}
                subjects={subject.Subjects}
              />
            ))}
        </div>
      </div>}
    </>

  );
});

export default SubjectPage;

const flattenSubjectIds = (subject: any): string[] => {
  const ids: string[] = [subject.id];

  const traverse = (subjects: any[]) => {
      for (const sub of subjects) {
          ids.push(sub.id);
          if (sub.Subjects.length > 0) {
              traverse(sub.Subjects);
          }
      }
  };

  traverse(subject.Subjects);

  return ids;
};

