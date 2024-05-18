import React, { forwardRef } from "react";

import "./Input.scss";

type InputProps = {
  label?: string;
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  return (
    <div className="input-container">
      {props.label && <label className="label">{props.label}</label>}
      <input
        ref={ref}
        className="input"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
});

export default Input;
