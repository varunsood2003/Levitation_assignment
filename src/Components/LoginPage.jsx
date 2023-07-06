import { useState } from "react";
import axios from 'axios'
const LoginPage = ({ auth, setAuth, setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        setAuth(responseData.authToken);
        setErrorMessage("");
        setErrorMessage("Congratulations");
        setIsAuth(false);
      } else if (response.status === 400) {
        setErrorMessage("Input Error. Check the request payload for issues.");
      } else if (response.status === 403) {
        setErrorMessage(
          "Access denied. Additional privileges are needed to access the requested resource."
        );
      } else if (response.status === 404) {
        setErrorMessage("Not Found. The requested resource does not exist.");
      } else if (response.status === 429) {
        setErrorMessage("Rate Limited. Too many requests.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "An error occurred during login. Please try again later."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-sm bg-gray-100 p-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
