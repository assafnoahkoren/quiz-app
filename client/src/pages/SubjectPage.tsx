import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";
import { useEffect } from "react";
import SubjectOption from "../components/subject/SubjectOption";
import Button from "../components/UIElements/Button";
import { Link } from "react-router-dom";
import Loading from "../components/UIElements/Loading";

import "./SubjectPage.scss";
import Search from "../components/UIElements/Search";

const SubjectPage = observer(() => {
  const subjectId = localStorage.getItem('selectedSubjectId');

  useEffect(() => {
    const fetchSubject = async () => {
      await dataStore.getSubjectById(subjectId);
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
            {dataStore.selectedSubjectFiltered.name && dataStore.selectedSubjectFiltered.name}
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
        {dataStore.selectedSubjectFiltered &&
          dataStore.selectedSubjectFiltered.subjects.map((subject) => {
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
      <Search type="sub" placeholder="חיפוש תת נושא"></Search>
    </div>
  );
});

export default SubjectPage;
