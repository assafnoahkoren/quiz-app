import "./SubjectCard.scss";

type subjectCardProps = {
  name: string;
  onClick: () => void;
  isNew?: boolean;
};

const SubjectCard = (props: subjectCardProps) => {
  let backgroundColor = localStorage.getItem(props.name);

  const colors = ["#FAAA0E", "#BC2A79", "#2A76BC"];

  const getColorBySubjectId = () => {
    let sum = 0;
    for (let i = 0; i < props.id.length; i++) {
      sum += props.id.charCodeAt(i);
    }
    const index = sum % colors.length;
    return colors[index];
  };

  if (!backgroundColor) {
    backgroundColor = getColorBySubjectId();
    localStorage.setItem(props.id, backgroundColor);
  }

  const handleCardClick = () => {
    document.documentElement.style.setProperty(
      "--global-subject-color",
      backgroundColor
    );
    props.onClick();
  };

  return (
    <div
      className="subject-card_container"
      onClick={handleCardClick}
      style={{ backgroundColor }}
    >
      {props.isNew && <div className="new-badge">חדש</div>}
      <div className="subject-card_name">{props.name}</div>
    </div>
  );
};

export default SubjectCard;
