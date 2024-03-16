import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-semibold text-center mb-4">HOME</div>
      <div className="text-center">
        <span className="text-lg"> {localStorage.getItem("EMAIL")} </span>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/signup");
          }}
          className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Home;
