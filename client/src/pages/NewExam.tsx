import { Link } from "react-router-dom";
import Button from "../components/UIElements/Button";

import "./NewExam.scss";
import ScoresChart from "../components/UIElements/ScoresChart";
import ToggleOption from "../components/UIElements/ToggleOption";

const NewExam = () => {
  const subjectId = localStorage.getItem("selectedSubjectId");

  return (
    <div className="page-wrapper">
      <Link
        to={`/subjectPage/${subjectId}`}
        className="back-to-main-button back"
      >
        <div>חזרה</div>
      </Link>
      <div className="new-quiz-title">מבחן חדש</div>
      <div className="new-quiz-row-wrapper">
        <div className="new-quiz-row-title">נושא:</div>
        <div className="main-subject-title">שמיעה</div>
      </div>
      <div className="new-quiz-row-wrapper">
        <div className="new-quiz-row-title">בנק שאלות:</div>
        <div className="main-subject-title">178</div>
      </div>
      <div className="new-quiz-past-score-title">תוצאות עבר</div>
      <ScoresChart firstNum={20} secondNum={40} thirdNum={118} total={178} />
      <div className="new-quiz-setting">
        <div className="new-quiz-setting-title">הגדרות</div>
        <ToggleOption>כלול שאלות שלא נענו</ToggleOption>
        <ToggleOption>כלול שאלות שנענו נכון</ToggleOption>
        <ToggleOption>כלול שאלות שנענו לא נכון</ToggleOption>
        <ToggleOption>הצג תשובה אחרי כל שאלה</ToggleOption>
      </div>
      <Link to={`/114/NewExam`}>
        <Button inverse bold>
          התחל קוויז כללי
        </Button>
      </Link>
    </div>
  );
};

export default NewExam;
