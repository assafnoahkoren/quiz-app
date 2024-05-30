import { useEffect, useState } from "react";
import { dataStore } from "../stores/DataStore";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/subject/SubjectCard";
import { SubjectType } from "../types/subjectType";
import Loading from "../components/UIElements/Loading";

import "./Homepage.scss";
import Search from "../components/UIElements/Search";

const HomePage = observer(() => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dataStore.getSubjects();
  }, []);

  const subjectClicked = (subjectId: string) => {
    dataStore.setSelectedSubject(subjectId);
    navigate(`/subjectPage/${subjectId}`);
  };

  return (
    dataStore.subjectsLoading ? 
      <Loading /> :
      <div className="page-container">
        {authStore.isLogged && (
          <div className="page-wrapper">
            <h3>מבחנים חדשים</h3>
            <div className="main-subjects-container">
              {dataStore.subjects
                .filter((subject: SubjectType) => subject.parentId === null)
                .map((subject: SubjectType) => (
                  <SubjectCard
                    isNew
                    onClick={() => subjectClicked(subject.id)}
                    id={subject.id}
                    key={subject.id}
                    name={subject.name}
                  />
                ))}
            </div>
            <h3>מבחנים שלי</h3>
            <div style={{ opacity: 0.2 }}>עדיין לא נבחרו מבחנים לתרגול...</div>
            <Search type='main' value={searchValue} setValue={setSearchValue} placeholder="חיפוש מבחן או נושא"></Search>
          </div>
        )}
      </div>
  );
});

export default HomePage;
