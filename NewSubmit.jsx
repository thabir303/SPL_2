import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewSubmit() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/submit-otp", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        if (res.data.code === 200) {
          navigate("/signin");
          alert("Password Updated Successfully.");
        } else {
          alert("Error: server error or incorrect OTP.");
        }
      })
      .catch((err) => {
        console.error("Error during submission:", err);
        alert("Submission error. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">FORGET PASSWORD</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter OTP"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Enter new password"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          CHANGE PASSWORD
        </button>
      </div>
    </div>
  );
}

export default NewSubmit;
