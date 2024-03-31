import React, { useState } from "react";
import "./UrlShortener.css";
const backendUrl = "http://localhost:3000";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(originalUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortenedUrl(`${backendUrl}/${data.shortUrl}`);
    } catch (error) {
      console.error(error);
      setError("Error shortening URL");
    }
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="url-body" >
      <div className="container">
        <header>
          <h1>Short.ly</h1>
          <p>Shorten your lengthy URLs in a snap!!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="url-form">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here"
            />
            <button type="submit">Shorten</button>
          </form>
          {error && <p className="error">{error}</p>}
          <div>
            {" "}
            <p>Shorten URL:</p>
            <div className="shortened-url">
              <input type="text" value={shortenedUrl || ""} readOnly />
              <button>Copy</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UrlShortener;
