import React from "react";

import "./style.scss";

const Input = (props) => {
  const { label, textarea} = props;
  return (
    <div id="form-group">
    <label>{label}</label>
     {!textarea ? 
     <input className="input" {...props}  />
     :
     <textarea className="input-area" {...props} /> 
    }
    </div>
  );
};

export default Input;
