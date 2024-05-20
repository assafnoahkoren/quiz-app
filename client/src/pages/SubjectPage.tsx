import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";
import { useEffect, useRef, useState } from "react";
import SubjectOption from "../components/UIElements/SubjectOption";
import Button from "../components/UIElements/Button";
import { Link } from "react-router-dom";
import Loading from "../components/UIElements/Loading";

import "./SubjectPage.scss";

const SubjectPage = observer(() => {
  const [selectedSubject, setSelectedSubject] = useState();
  const backgroundColor = useRef<string | null>(null);
  const subjectId = localStorage.getItem('selectedSubjectId');

  useEffect(() => {
    const fetchSubject = async () => {
      await dataStore.getSubjectById(subjectId);
      setSelectedSubject(dataStore.subjectsMap.get(subjectId)?.subject);
      backgroundColor.current = selectedSubject
        ? localStorage.getItem(selectedSubject.name)
        : null;
    };
    fetchSubject();
  }, []);

  return dataStore.subjectsMap.get(subjectId)?.isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="page-wraper">
      <div className="subject-page_header">
        <div className="subject-page_header-top">
          <h3 className="main-subject-title">
            {selectedSubject && selectedSubject.name}
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
          selectedSubject.Subjects.map((subject) => {
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
    </div>
  );
});

export default SubjectPage;
