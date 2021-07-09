import React from "react";

import "./style.scss";

const Input = (props) => {
  const { label, textarea,modal, ...rest} = props;
  return (
    <div id="form-group">
    <label className={modal ? "label-modal" : "label"}>{label}</label>
     {!textarea ? 
     <input className="input" {...props} {...rest}  />
     :
     <textarea className="input-area" {...props} {...rest} /> 
    }
    </div>
  );
};

export default Input;
