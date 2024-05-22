import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";
import Navbar from "./components/navbar/Navbar";

import './App.scss';
import SubjectPage from "./pages/SubjectPage";
import useGlobalColor from "./hooks/useGlobalColor";
import NewExam from "./pages/NewExam";

const App = () => {

  useGlobalColor();
  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/subjectPage/:subjectId' element={<SubjectPage/>}/>
          <Route path="/:subjectId/NewExam" element={<NewExam />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
