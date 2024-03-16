import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/send-otp", {
        email: email,
      })
      .then((res) => {
        if (res.data.code === 200) {
          navigate("/otp");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.error("Error during request:", err);
        alert("Email submission error. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forget Password</h1>
        <input
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSubmit}
        >
          SEND OTP
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
