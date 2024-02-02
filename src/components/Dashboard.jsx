import React, { useEffect } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Lorem Ipsum",
      url: "https://example.com/article1",
      hnUrl: "https://news.ycombinator.com/item?id=123",
      postedOnText: "2 hours ago",
      upvotes: "10 points",
      comments: "5 comments",
    },
    {
      id: 2,
      title: "Dolor Sit Amet",
      url: "https://example.com/article2",
      hnUrl: "https://news.ycombinator.com/item?id=456",
      postedOn: "10 minutes ago",
      upvotes: "15 points",
      comments: "8 comments",
    },
    // Add more news articles here...
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/news-items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex bg-custom-orange  items-center mb-4">
        <img src="/y18.svg" alt="Logo" className="w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold ">Hacker News Clone</h1>
      </div>
      <ul className="space-y-2">
        {newsArticles.map((article, idx) => (
          <li key={article.id} className="border rounded p-1">
            <a href={article.url} className="text-xl font-bold">
              {idx + 1}. {article.title}
            </a>
            <p className="text-gray-600">
              {article.upvotes} | {article.postedOn} | {article.comments} |{" "}
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
