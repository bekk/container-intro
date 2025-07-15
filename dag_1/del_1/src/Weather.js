import React, { useState, useEffect } from "react";

function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/weather") // this calls the Function App
      .then((res) => res.json())
      .then((data) => {
        if (data.temperature !== undefined) {
          setTemperature(data.temperature);
        } else {
          setError("Kunne ikke hente værdata.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Feil ved henting av værdata.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laster vær...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Været i dag</h2>
      <p>Temperatur: {temperature}°C</p>
    </div>
  );
}

export default Weather;
