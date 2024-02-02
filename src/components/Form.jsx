import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Form = ({ text }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [modalText, setModalText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const [userId, setUserId] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetForm = () => {
    setPassword("");
    setEmail("");
  };

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "Signup") {
      if (!isValidEmail(email)) {
        setModalText("Enter a valid email");
        setShowModal(true);
        return;
      }
      if (password.length < 6) {
        setModalText("Password must be at least 6 characters long");
        setShowModal(true);
        return;
      }
      api
        .post("/signup", { email, password })
        .then((res) => {
          setModalText("Signup successful");
          setShowModal(true);
          setGoNext(true);
        })
        .catch((err) => {
          console.log(err);
          setModalText("Signup failed");
          setShowModal(true);
        });
    } else {
      api
        .post("/login", { email, password })
        .then((res) => {
          const { token, userId } = res.data;
          localStorage.setItem("token", token); // Save token to local storage
          setUserId(userId);
          setModalText("Login successful");
          setShowModal(true);
          setGoNext(true);
        })
        .catch((err) => {
          console.log(err);
          const errorMessage = err.response.data.error;
          setModalText(errorMessage);
          setShowModal(true);
        });
    }
    // Reset form values
    resetForm();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-lg rounded px-8 py-4">
            <p className="text-red-500">{modalText}</p>
            <div className="flex justify-center">
              <button
                className="mt-4 bg-custom-orange hover:bg-custom-hover font-bold py-1 px-3 rounded"
                onClick={() => {
                  setShowModal(false);
                  if (goNext) {
                    setGoNext(false);
                    if (text === "Signup") {
                      navigate("/login");
                    } else {
                      navigate(`/dashboard/${userId}`);
                    }
                  }
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`max-w-md mx-auto ${showModal ? "opacity-50" : ""} mt-20`}
      >
        <h1 className="text-4xl font-bold rounded p-3 bg-custom-orange text-center">
          {text}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-custom-orange hover:bg-custom-hover font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {text}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
