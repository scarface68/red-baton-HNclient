import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    api
      .get("/news-items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNewsArticles(
          res.data
            .sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
            .slice(0, 90)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex bg-custom-orange items-center mb-4">
        <img
          src="/y18.svg"
          alt="Logo"
          className="w-6 h-6 m-2 border border-white"
        />
        <h1 className="text-2xl font-bold">Hacker News Clone</h1>
        <button
          className="ml-auto border-black border-2 rounded m-2 p-1 font-bold"
          onClick={() => {
            api
              .post(
                "/news-items",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((res) => {
                // Trigger useEffect here
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(localStorage.getItem("token"));
          }}
        >
          Fetch latest
        </button>
      </div>
      <ul className="space-y-2">
        {newsArticles.map((article, idx) => (
          <li key={article.id} className="border rounded p-1">
            <a href={article.url} className="text-xl font-bold">
              {idx + 1}. {article.title}
            </a>
            <p className="text-gray-600">
              {article.upvotes} | {article.postedOnText} | {article.comments} |{" "}
              <a href={article.hnUrl} className="text-blue-500">
                Hacker News
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
