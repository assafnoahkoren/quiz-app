import React, { ReactNode } from "react";
import "./Button.scss";

type buttonProps = {
  onClick?: () => void;
  children: ReactNode;
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
