import "./SubjectCard.scss";

type subjectCardProps = {
  name: string;
  questionsCount?: number;
  onClick: () => void;
};

const SubjectCard = (props: subjectCardProps) => {
  return (
    <div className="subject-card_container" onClick={props.onClick}>
      <div className="subject-card_name">{props.name}</div>
      <div className="subject-card_qcount">{props.questionsCount}</div>
    </div>
  );
};

export default SubjectCard;
