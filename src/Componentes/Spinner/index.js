import React from "react";
import Loader from "react-loader-spinner";

import './style.scss'

const LoadSpinner = () => {
  return (
    <Loader
      type="Puff"
      color="var(--blue-dark)"
      timeout={3000}
      className="spinner"
    />
  );
};

export default LoadSpinner;
