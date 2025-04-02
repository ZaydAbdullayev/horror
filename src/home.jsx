import { useState } from "react";
import "./home.css";
import "./components/index.scss";
import logo from "./assets/logo.gif";
import { GlitchButton } from "./components/button";
import witcher from "./assets/witcher.gif";
import bats from "./assets/bats.gif";
import spider from "./assets/spider.gif";
import { BiSolidCopy } from "react-icons/bi";

const art_types = [
  "Cartoon",
  "Anime",
  "Realistic",
  "3D",
  "Pixel Art",
  "Low Poly",
  "Abstract",
  "Surreal",
  "Fantasy",
  "Sci-Fi",
];

const token = import.meta.env.VITE_OPEN_AI_API_KEY;

//horror generic component
export const App = () => {
  const [apiKey, setApiKey] = useState("");
  const [scene, setScene] = useState("");
  const [artType, setArtType] = useState("Cartoon");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [testKey, setTestKey] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard");
    });
  };

  return (
    <div className="wrapper">
      <div className="home-container">
        <div className="home-header">
          <img src={logo} alt="Logo" className="home-logo" />
          <h1>Welcome to our platform</h1>
          <h2>
            Discover the world of{" "}
            <span className="glitch" data-text="horror">
              HORROR
            </span>
          </h2>
          <p>
            Join our journey into the unknown and create your own horror novel
          </p>
          <div className="links">
            <GlitchButton>Telegram</GlitchButton>
            <GlitchButton>X</GlitchButton>
            <GlitchButton>Connect Wallet</GlitchButton>
          </div>
          <img src={spider} alt="Spider" className="spider" />
          <img src={spider} alt="Spider" className="spider _2" />
        </div>
        <div className="home-content">
          <h2>Crete your own horror novel</h2>
          <img src={witcher} alt="Witcher" className="witcher" />
          <div className="_content">
            <div className="api-key">
              <div>
                Your OpenAI API Key:{" "}
                <div>
                  {!testKey ? (
                    <>
                      <span onClick={() => setTestKey(true)}>
                        Need a test key ?
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      <img src={bats} alt="bats" className="bats" />
                      <label className="token">
                        <span>
                          {token.slice(0, 4)}
                          ........................................
                          {token.slice(-4)}
                        </span>
                        <BiSolidCopy onClick={() => copyToClipboard(token)} />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <input
                type="text"
                placeholder="sk-..."
                className="api-key-input"
                onChange={(e) => {
                  localStorage.setItem("apiKey", e.target.value);
                }}
              />
            </div>

            <small>
              Your API key is used only in your browser and never sent to our
              servers.
            </small>

            <label className="scene-label">
              <span>Describe your cartoon scene:</span>
              <textarea
                placeholder="Write your scene here..."
                className="scene-input"
                onChange={(e) => {
                  localStorage.setItem("scene", e.target.value);
                }}
              ></textarea>
            </label>

            <div className="art-type">
              <span>Choose your art style:</span>
              <div className="art-type-list">
                {art_types.map((type) => (
                  <div
                    key={type}
                    className={`art-type-item ${
                      artType === type ? "active" : ""
                    }`}
                    onClick={() => setArtType(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <button className="generate">Generate</button>

            <div className="result">
              <h3>Generated Image</h3>
              {loading && <p>Loading...</p>}
              {error && <p className="error">{error}</p>}
              {result && (
                <div className="result-content">
                  <img src={result} alt="Generated" className="result-image" />
                </div>
              )}
            </div>

            <div className="offer">
              <h3>
                Creating a full film animated costs 10,000 $HRR (HORROR Tokens)
              </h3>
              <span>Get your own AI model for 0.1 ETH</span>
              <p>Join our community and get access to exclusive features</p>
              <p>Limited time offer!</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="home-footer">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};
