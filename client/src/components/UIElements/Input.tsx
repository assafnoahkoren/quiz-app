import React, { forwardRef } from "react";

import "./Input.scss";

type InputProps = {
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
  return (
      <input
        ref={ref}
        className="input"
        type={props.type}
        placeholder={props.placeholder}
      />
  );
});

export default Input;
