import { useEffect } from "react";
import { dataStore } from "../stores/DataStore";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
  useEffect(() => {
    dataStore.getSubjects();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {dataStore.subjects.map((subject: any) => (
          <div key={subject.id}>
            <h2>{subject.name}</h2>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default HomePage;
