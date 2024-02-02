import React, { useState } from "react";
import api from "../api/axios";

const Form = ({ text }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetForm = () => {
    setPassword("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset form values
    resetForm();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded px-8 py-4">
            <p className="text-red-500">
              Only people within the age limit of 18-65 can enroll for the
              monthly classes
            </p>
            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }} // Close the modal when the button is clicked
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        className={`max-w-md mx-auto ${showModal ? "opacity-50" : ""} mt-20`}
      >
        <h1 className="text-4xl font-bold rounded text-white p-3 bg-green-500 text-center">
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
              Name<span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
