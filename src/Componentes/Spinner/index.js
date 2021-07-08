import React from "react";
import Loader from "react-loader-spinner";

const LoadSpinner = () => {
  return (
    <Loader
      type="Puff"
      color="#DEE7FF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
};

export default LoadSpinner;
