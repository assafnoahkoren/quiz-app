import "./ToggleOption.scss";

type ToggleOptionProps = {
  children: string;
};

const ToggleOption: React.FC<ToggleOptionProps> = ({ children }) => {
  return (
    <div className="toggle-option-wrapper">
      <div className="toggle-option-button">0</div>
      <div className="toggle-option-description">{children}</div>
    </div>
  );
};

export default ToggleOption;
