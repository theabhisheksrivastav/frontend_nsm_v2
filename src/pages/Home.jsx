
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button 
        onClick={() => window.location.href = '/login'} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Home;
