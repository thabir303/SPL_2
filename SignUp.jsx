import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@(iit\.du\.ac\.bd|du\.ac\.bd)$/;

    if (!emailRegex.test(email)) {
      alert('Invalid email format. Please use email addresses ending with "@iit.du.ac.bd" or "@du.ac.bd".');
      return;
    }

    axios
      .post("http://localhost:5000/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Signup success. Please check your email to verify your account.");
          navigate("/signin"); // Navigate to sign in page after successful signup
        } else {
          alert("Signup failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        alert("Signup error. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-4xl font-semibold text-center mb-6">Sign Up</h1>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <Link
            to="/signin"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
