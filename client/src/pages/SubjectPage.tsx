import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SubjectOption from "../components/UIElements/SubjectOption";
import { subjectType } from "../types/subjectType";

const SubjectPage = observer(() => {
  const [selectedSubject, setSelectedSubject] = useState();
  const subjectId = useParams().subjectId;

  useEffect(() => {
    const fetchSubject = async () => {
      const data = await dataStore.getSubjectById(subjectId);
      setSelectedSubject(data);
    };
    fetchSubject();
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

  const getRecursiveSubject = (curSubject: subjectType) => {
    return (
      <li key={curSubject.id} style={{ listStyle: 'none' }}>
        <SubjectOption
          description={curSubject.description}
          name={curSubject.name}
        />
        {curSubject.Subjects && (
          <ul style={{ listStyle: 'none' }}>
            {curSubject.Subjects.map((subject: subjectType) =>
              getRecursiveSubject(subject)
            )}
          </ul>
        )}
      </li>
    );
  };

  return <div style={{textAlign: 'end', direction: 'rtl'}}>{selectedSubject && getRecursiveSubject(selectedSubject)}</div>;
});

export default SubjectPage;
