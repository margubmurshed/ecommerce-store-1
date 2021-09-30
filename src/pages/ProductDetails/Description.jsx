import React from "react";

const Description = ({ description }) => {
  return (
    <>
      <div
        className="bg-white shadow-md m-auto p-5"
      >
        <p className="text-2xl font-semibold mb-5">Description</p>
        <div className="bg-gray-100 rounded-md p-5">
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Description;
