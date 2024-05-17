import "./Button.scss";

type buttonProps = {
  onClick?: () => void;
  children: string;
};

const Button = (props: buttonProps) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
