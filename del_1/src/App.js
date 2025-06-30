import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [healthStatus, setHealthStatus] = useState("Checking...");

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 1000));
  };

  const checkHealth = () => {
    setHealthStatus("Healthy! Running on React " + React.version);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Docker Workshop - Del 1</h1>
        <p>Velkommen til container-introduksjonen!</p>

        <div className="content">
          <div className="section">
            <h2>Hjemmeside</h2>
            <p>
              Dette er en enkel React-applikasjon som kjører i en container.
            </p>
          </div>

          <div className="section">
            <h2>Helsesjekk</h2>
            <p>{healthStatus}</p>
            <button onClick={checkHealth}>Sjekk helse på nytt</button>
          </div>

          <div className="section">
            <h2>Tilfeldig tall</h2>
            <p>
              Nåværende tall:{" "}
              {randomNumber !== null ? randomNumber : "Ingen generert"}
            </p>
            <button onClick={generateRandomNumber}>Generer nytt tall</button>
          </div>
        </div>

        <div className="info">
          <p>
            Denne appen erstatter den tidligere Express-serveren med en
            React-applikasjon.
          </p>
          <p>Perfekt for å lære om Docker containers!</p>
        </div>
      </header>
    </div>
  );
}

export default App;
