import "./Button.scss";

type buttonProps = {
  onClick?: () => void;
  children: string;
  inverse?: boolean;
  bold?: boolean;
};

const Button = (props: buttonProps) => {

  return (
    <button className={`button ${props.inverse && 'inverse'} ${props.bold && 'bold'}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
