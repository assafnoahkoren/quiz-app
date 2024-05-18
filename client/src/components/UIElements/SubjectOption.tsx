import "./SubjectOption.scss";

interface SubjectOptionProps {
  name: string;
  description: string;
  questionsCount?: number;
  parentId?: string;
}

const SubjectOption: React.FC<SubjectOptionProps> = ({
  name,
  description,
  questionsCount,
}) => {
  return (
    <div className="subject-option_container">
      <div className="subject-option_name">{name}</div>
      <div className="subject-option_description">{description}</div>
      {questionsCount && <div className="subject-option_qcount">{questionsCount}</div>}
    </div>
  );
};

export default SubjectOption;
