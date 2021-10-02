import { useState } from "react";

const Alert = ({ color, message }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`flex justify-between items-center px-5 py-3 bg-${color}-200 text-${color}-500 font-semibold mb-5 rounded-md cursor-pointer ${isOpen ? 'block' : 'hidden'}`}
      >
        <span>{message}</span>
        <i className="fas fa-times-circle cursor-pointer" onClick={() => setIsOpen(false)}></i>
      </div>
    </>
  );
};

export default Alert;
