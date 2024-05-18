import { useEffect, useState } from "react";
import { dataStore } from "../stores/DataStore";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import Card from "../components/UIElements/Card";
import { Link } from "react-router-dom";
import SubjectOption from "../components/UIElements/SubjectOption";

type subjectType = {
  id: string;
  name: string;
  description: string;
  parentId: string;
  createdAt: string;
  Subjects: subjectType[];
};

const HomePage = observer(() => {
  const [selectedSubject, setSelectedSubject] = useState<subjectType>();

  useEffect(() => {
    const fetchSubjects = async () => {
      await dataStore.getSubjects();
      setSelectedSubject(await dataStore.getSubjectById("114"));
    };
    fetchSubjects();
  }, []);

  const recursiveSubjects2 = (curSubject: subjectType): React.ReactNode[] => {
    let subjectNodes: React.ReactNode[] = [];
    if (curSubject.Subjects) {
      curSubject.Subjects.forEach((subject: subjectType) => {
        const subjectNode = (
          <SubjectOption
            key={subject.id}
            description={subject.description}
            name={subject.name}
          />
        );
        subjectNodes.push(subjectNode);
        subjectNodes = subjectNodes.concat(recursiveSubjects(subject));
      });
    }
    return subjectNodes;
  };

  const recursiveSubjects = (curSubject: subjectType): React.ReactNode => {
    return (
      <li key={curSubject.id}>
        <SubjectOption
          description={curSubject.description}
          name={curSubject.name}
        />
        {curSubject.Subjects && (
          <ul>
            {curSubject.Subjects.map((subject: subjectType) =>
              recursiveSubjects(subject)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Card>
      <h2>select subject to practice</h2>
      <div>
        {authStore.isLogged ? (
          dataStore.subjects
            .filter((subject: subjectType) => subject.parentId === null)
            .map((subject: subjectType) => (
              <SubjectOption
                key={subject.id}
                description={subject.description}
                name={subject.name}
              />
            ))
        ) : (
          <h2>
            Please <Link to="/login">login</Link> to continue
          </h2>
        )}
      </div>
      <div>{selectedSubject && recursiveSubjects(selectedSubject)}</div>
    </Card>
  );
});

export default HomePage;
