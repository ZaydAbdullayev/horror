import { useState, useEffect } from "react";
import "./home.css";
import "./components/index.scss";
import logo from "./assets/logo.gif";
import { GlitchButton } from "./components/button";
import witcher from "./assets/witcher.gif";
import bats from "./assets/bats.gif";
import spider from "./assets/spider.gif";
import { BiSolidCopy } from "react-icons/bi";
import music from "./assets/music.mp3";
import bat_sound from "./assets/bats-sound.mp3";
import { generateImages } from "./context/fetch.service";
import { examples } from "./context/datas";

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
  const [testKey, setTestKey] = useState(false);
  const [audio] = useState(new Audio(music));
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  const [batSound] = useState(new Audio(bat_sound));

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard");
    });
  };

  useEffect(() => {
    const playMusic = () => {
      if (!isMusicStarted) {
        audio.loop = true;
        audio.volume = 0.1;
        audio.play().catch((err) => console.log("Autoplay blocked:", err));
        setIsMusicStarted(true);
      }
    };

    document.addEventListener("click", playMusic, { once: true });

    return () => document.removeEventListener("click", playMusic);
  }, [isMusicStarted, audio]);

  const playBatSound = () => {
    batSound.volume = 0.1;
    batSound.play().catch((err) => console.log("Autoplay blocked:", err));
    setTimeout(() => {
      batSound.pause();
    }, 2000); // Play for 5 seconds
  };

  const generateImage = async () => {
    if (!apiKey) {
      alert("Please enter your OpenAI API key");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await generateImages(apiKey, artType, scene);
      console.log(response);
      setResult(response);

      // if (!response.ok) {
      //   throw new Error("Failed to generate image");
      // }

      // const data = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            <GlitchButton
              onclick={() =>
                window.open(
                  "https://phantom.com/learn/crypto-101/what-is-a-crypto-wallet#how-do-crypto-wallets-work",
                  "_blank"
                )
              }
            >
              Connect Wallet
            </GlitchButton>
          </div>
          <img src={spider} alt="Spider" className="spider" />
          <img src={spider} alt="Spider" className="spider _2" />
        </div>
        <div className="home-content">
          <h2>Crete your own horror novel</h2>
          <img src={witcher} alt="Witcher" className="witcher" />
          <div className="_content">
            <img src={spider} alt="Spider" className="spider" />
            <img src={spider} alt="Spider" className="spider _2" />
            <div className="api-key">
              <div>
                Your OpenAI API Key:{" "}
                <div>
                  {!testKey ? (
                    <>
                      <span
                        onClick={() => {
                          setTestKey(true);
                          playBatSound();
                        }}
                      >
                        Need a test key ?
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      <img src={bats} alt="bats" className="bats" />
                      <label className="token">
                        <span>
                          {token.slice(0, 4)}
                          .................
                          {token.slice(-4)}
                        </span>
                        <BiSolidCopy onClick={() => copyToClipboard(token)} />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <input
                type="password"
                placeholder="sk-..."
                className="api-key-input"
                onChange={(e) => {
                  setApiKey(e.target.value);
                  sessionStorage.setItem("apiKey", e.target.value);
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
                  setScene(e.target.value);
                  sessionStorage.setItem("scene", e.target.value);
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
            <button className="generate" onClick={() => generateImage()}>
              Generate
            </button>

            <div className="result">
              <h3>Generated Image:</h3>
              {loading && <p>Loading...</p>}
              {error && <p className="error">{error}</p>}
              {result?.length ? (
                <div className={`result-content ${result.length === 1 ? "single" : ""}`}>
                  {result.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Generated ${index}`}
                      className="generated-image"
                    />
                  ))}
                </div>
              ) : (
                ""
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

        <div className="examples">
          <h3>Example Comics Library</h3>
          <div className="grid-gallery">
            {examples.map((videoId) => (
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid-gallery-item"
                key={videoId}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube Thumbnail"
                  className="w-full h-auto"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="play-space">
          <h3>Play Space</h3>
        </div>
      </div>
      <footer className="home-footer">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};
