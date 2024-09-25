const CustomButton = ({ children, type }) => {
  return (
    <button
      type={type}
      className="bg-blue-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
};

export default CustomButton;
