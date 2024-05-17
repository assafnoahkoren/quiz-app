import React from "react";

import "./Input.scss";

type InputProps = {
  label?: string;
  value?: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-container">
      {props.label && <label className="label">{props.label}</label>}
      <input
        className="input"
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
