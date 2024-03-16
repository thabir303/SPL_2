import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:5000/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 200) {
          // move to home
          navigate("/");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-4xl font-semibold text-center mb-6">Sign In</h1>
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br></br>
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
          Sign In
        </button>
        <div className="text-center mt-4">
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 text-sm mr-2"
          >
            Sign Up
          </Link>
          <Link
            to="/forget-pass"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
