import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";
import Navbar from "./components/navbar/Navbar";

import './App.scss';
import SubjectPage from "./pages/SubjectPage";
import { setGlobalColor } from "./services/themeService";
import { ApiService } from "./services/api-service";
import { QuizPage } from "./pages/QuizPage";
import NiceModal from "@ebay/nice-modal-react";
ApiService
import './components/modals/QuestionEditModal'
import './components/modals/AddQuestionsModal'
import 'swiper/css';
import { ThemeLayer } from "./theme";


const App = () => {
  setGlobalColor();

  return (
    <ThemeLayer>
      <NiceModal.Provider>
        <Router>
          <Navbar />
          <div className="main-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path='/subjectPage/:subjectId' element={<SubjectPage />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </NiceModal.Provider>
    </ThemeLayer>
  );
};

export default App;
