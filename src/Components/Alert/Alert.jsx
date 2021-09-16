const Alert = ({ color, message }) => {
  return (
    <>
      <div
        className={`flex justify-between items-center px-5 py-3 bg-${color}-200 text-${color}-500 font-semibold mb-5 rounded-md cursor-pointer`}
      >
        <span>{message}</span>
        <i className="fas fa-times-circle cursor-pointer"></i>
      </div>
    </>
  );
};

export default Alert;
