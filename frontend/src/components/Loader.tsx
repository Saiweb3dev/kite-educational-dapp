const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-4 h-screen bg-white">
      <span className="loading loading-spinner text-info"></span>
      <p className="text-xl text-blue-700">Please wait a sec...</p>
    </div>
  );
};

export default Loader;
