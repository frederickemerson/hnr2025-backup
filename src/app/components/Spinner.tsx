import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-500"></div>
    </div>
  );
};

export default Spinner;
