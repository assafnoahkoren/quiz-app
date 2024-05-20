import "./SubjectCard.scss";

type subjectCardProps = {
  name: string;
  onClick: () => void;
  isNew?: boolean;
};

const colors = ["#FAAA0E", "#BC2A79", "#2A76BC"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  return color;
};

const SubjectCard = (props: subjectCardProps) => {
  let backgroundColor = localStorage.getItem(props.name);

  if (!backgroundColor) {
    backgroundColor = getRandomColor();
    localStorage.setItem(props.name, backgroundColor);
  }

  const handleCardClick = () => {
    document.documentElement.style.setProperty('--global-subject-color', backgroundColor);
    props.onClick()
  }

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