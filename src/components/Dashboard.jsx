import React from "react";

const Dashboard = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Lorem Ipsum",
      url: "https://example.com/article1",
      points: 10,
      author: "John Doe",
      comments: 5,
    },
    {
      id: 2,
      title: "Dolor Sit Amet",
      url: "https://example.com/article2",
      points: 15,
      author: "Jane Smith",
      comments: 8,
    },
    // Add more news articles here...
  ];

  return (
    <div className="container mx-auto">
      <div className="flex bg-custom-orange items-center mb-4">
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
              {article.points} points by {article.author} | {article.comments}{" "}
              comments
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
