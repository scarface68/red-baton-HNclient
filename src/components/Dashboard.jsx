import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/news-items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filteredArticles = res.data.filter(
          (article) => !article.deleted.includes(userId)
        );
        setNewsArticles(
          filteredArticles
            .sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
            .slice(0, Math.min(90, filteredArticles.length))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newsArticles]);

  const handleCheckboxChange = (articleId) => {
    api
      .put(
        `/news-items/${articleId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setNewsArticles((articles) => {
          return articles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                read: [...article.read, userId],
              };
            }
            return article;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (articleId) => {
    api
      .put(
        `/news-items/${articleId}/delete`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setNewsArticles((articles) => {
          return articles.map((article) => {
            if (article.id === articleId) {
              return {
                ...article,
                deleted: [...article.deleted, userId],
              };
            }
            return article;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
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
              </a>{" "}
              |{" "}
              <label>
                <input
                  type="checkbox"
                  checked={article.read.length && article.read.includes(userId)}
                  onChange={() => handleCheckboxChange(article.id)}
                />
                <span style={{ marginLeft: "0.5rem" }}>Read</span>
              </label>{" "}
              |{" "}
              <button
                className="text-red-500"
                onClick={() => handleDelete(article.id)}
              >
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
