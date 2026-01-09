"use client";

import { useState } from "react";

export default function Home() {
  const [usd, setUsd] = useState("");
  const [cad, setCad] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);

  function handleConvert() {
    if (usd.trim() === "") {
      return;
    }

    const usdNum = Number(usd);

    if (Number.isNaN(usdNum)) {
      return;
    }

    fetch("/api/rate")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend request failed");
        }
        return res.json();
      })
      .then((data) => {
        if (typeof data.rate !== "number" || Number.isNaN(data.rate) || typeof data.rateDate !== "string") 
        {
          throw new Error("Invalid API response shape");
        }

        const cadValue = usdNum * data.rate;

        setCad(cadValue.toFixed(2));
        setRate(data.rate);
        setRateDate(data.rateDate);
        
      })
      
      .catch((err) => {
      });
  }

  return (
    <main
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      padding: "2rem",
    }}
  >
  
      <h1>USD to CAD Converter</h1>

      <input
        type="text"
        value={usd}
        onChange={(e) => setUsd(e.target.value)}
        placeholder="Enter USD amount"
      />

      <button onClick={handleConvert}>Convert</button>

      {/* render results */}
      {rate !== null && rateDate !== null && cad !== "" && (

        
        <div style={{ marginTop: "1rem" }}>
          <div>CAD: {cad}</div>
          <div>Rate: {rate}</div>
          <div>As of: {rateDate}</div>
        </div>
      )}
    </main>
  );
}

