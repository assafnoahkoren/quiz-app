import { useEffect } from "react";
import { dataStore } from "../stores/DataStore";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/AuthStore";
import Card from "../components/UIElements/Card";
import { Link } from "react-router-dom";

const HomePage = observer(() => {
  useEffect(() => {
    dataStore.getSubjects();
  }, []);

  return (
    <Card>
      <h1>Home Page</h1>
      <div>
        {authStore.isLogged ? (
          dataStore.subjects.map((subject: any) => (
            <div key={subject.id}>
              <h2>{subject.name}</h2>
              <p>{subject.description}</p>
            </div>
          ))
        ) : (
          <h2>Please <Link to="/login">login</Link> to continue</h2>
        )}
      </div>
    </Card>
  );
});

export default HomePage;
