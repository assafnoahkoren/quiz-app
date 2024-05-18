import { useEffect } from "react";
import { dataStore } from "../stores/DataStore";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import SubjectCard from "../components/UIElements/SubjectCard";
import { subjectType } from "../types/subjectType";

import "./Homepage.scss";

const HomePage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    dataStore.getSubjects();
  }, []);

  const subjectClicked = (subjectId: string) => {
    dataStore.setSelectedSubject(subjectId);
    navigate(`/subjectPage/${subjectId}`);
  };

  return (
    <div className="page-container">
      {authStore.isLogged && (
        <>
          <h2>select subject to practice</h2>
          <div className="main-subjects-container">
            {dataStore.subjects
              .filter((subject: subjectType) => subject.parentId === null)
              .map((subject: subjectType) => (
                <SubjectCard
                  onClick={() => subjectClicked(subject.id)}
                  key={subject.id}
                  name={subject.name}
                />
              ))}
          </div>
        </>
      )}

      {!authStore.isLogged && (
        <h3>
          Please <Link to="/login">login</Link> to continue
        </h3>
      )}
    </div>
  );
});

export default HomePage;
