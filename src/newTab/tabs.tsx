import React, { useState } from "react";
import "./tabs.css";

function Tabs() {
  const [mode, setMode] = useState(true);
  const toggleMode = () => {
    setMode(!mode);
  };

  return (
    <div className="container">
      <div className="subContainer">
        <span className="title">PocketGPT</span>
        <div className="tabs">
          <span
            onClick={toggleMode}
            className={`tab ${mode ? "tab-selected" : ""}`}
          >
            All
          </span>
          <span
            onClick={toggleMode}
            className={`tab ${!mode ? "tab-selected" : ""}`}
          >
            Daily Digest
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
