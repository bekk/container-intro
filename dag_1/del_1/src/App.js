import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Quotes from "./Quotes";

const spinnerStyle = {
  display: "inline-block",
  width: "40px",
  height: "40px",
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "1em auto",
};

function Home() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [healthStatus, setHealthStatus] = useState("Checking...");
  const [visitMeResponse, setVisitMeResponse] = useState(null);

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 1000));
  };

  const checkHealth = () => {
    setHealthStatus("Healthy! Running on React " + React.version);
  };

  const fetchQuote = async () => {
    setVisitMeResponse("Laster...");
    try {
      const res = await fetch(
        "https://corsproxy.io/?https://quotes.alakhpc.com/quotes"
      );
      const data = await res.json();
      setVisitMeResponse(data);
    } catch (err) {
      setVisitMeResponse({ error: "Feil ved henting av data" });
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Docker workshop - sesjon 1</h1>
        <p>Velkommen til container-introduksjonen!</p>
        <p>Status: {healthStatus}</p>

        <div className="content">
          <div className="section">
            <button onClick={fetchQuote}>Hent en random quote!</button>
            {visitMeResponse === "Laster..." && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={spinnerStyle} />
              </div>
            )}
            {visitMeResponse &&
            !visitMeResponse.error &&
            visitMeResponse.text ? (
              <div
                style={{
                  marginTop: "1em",
                  padding: "1em",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  background: "#222",
                }}
              >
                <p style={{ fontStyle: "italic", fontSize: "1.2em" }}>
                  &ldquo;{visitMeResponse.text}&rdquo;
                </p>
                <p style={{ margin: 0 }}>
                  <strong>{visitMeResponse.character}</strong>{" "}
                  <span style={{ color: "#aaa" }}>
                    ({visitMeResponse.show})
                  </span>
                </p>
              </div>
            ) : visitMeResponse && visitMeResponse.error ? (
              <p>{visitMeResponse.error}</p>
            ) : null}
          </div>
        </div>
      </header>
    </div>
  );
}

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Hjem</Link>
          </li>
          <li>
            <Link to="/vaer">Vær</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vaer" element={<Quotes />} />
      </Routes>
    </Router>
  );
}

export default App;
