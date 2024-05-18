import "./Button.scss";

type buttonProps = {
  onClick?: () => void;
  children: string;
  inverse?: boolean;
};

const Button = (props: buttonProps) => {

  const buttonClass = props.inverse ? 'button-inverse' : 'button';

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
