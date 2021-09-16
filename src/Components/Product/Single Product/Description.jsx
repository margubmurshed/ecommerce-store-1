import React from "react";

const Description = ({description}) => {
  return (
    <>
      <div
        className="bg-white p-10 shadow-md m-auto"
        style={{ maxWidth: "80%" }}
      >
        <p className="text-2xl font-semibold mb-5">Description</p>
        <div className="bg-gray-100 rounded-md p-5">
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Description;
