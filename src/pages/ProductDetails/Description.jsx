import Title from "../../Components/Title";
const Description = ({ description }) => {
  return (
    <>
      <div className="bg-white shadow-md m-auto p-5 w-full">
        <Title>Description</Title>
        <div className="bg-gray-100 rounded-md p-5">
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Description;
