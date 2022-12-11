import React, { useState, useEffect } from "react";
import "./tabs.css";
const axios = require("axios");
import UrlCard from "./urlcard";
import DigestDateCard from "./digestdatecard";
import DigestCard from "./digestcard";

function Tabs() {
  const [mode, setMode] = useState(true);
  const [status, setStatus] = useState(null);
  const [allData, setAllData] = useState([]);
  const [dailyDigestData, setDailyDigestData] = useState([]);
  const [digestDate, setDigestDate] = useState(null);
  const [digestData, setDigestData] = useState({});

  useEffect(() => {
    if (status === "success" || status === "failure") {
      setTimeout(() => setStatus(null), 3000);
    }
  }, [status]);

  const fetchAllData = async () => {
    try {
      setStatus("loading");
      const response = await axios.get(
        "https://PocketGPT-For-Assembly-AI-Hackathon.saumopal97.repl.co/v1/api/all"
      );
      console.log("response  ", response);
      setAllData(response.data.data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const fetchAllDailyDigestData = async () => {
    try {
      setStatus("loading");
      const response = await axios.get(
        "https://PocketGPT-For-Assembly-AI-Hackathon.saumopal97.repl.co/v1/api/roundup/all"
      );
      console.log("response  ", response);
      setDailyDigestData(response.data.data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const fetchDailyDigestData = async () => {
    try {
      setStatus("loading");
      const response = await axios.post(
        "https://PocketGPT-For-Assembly-AI-Hackathon.saumopal97.repl.co/v1/api/roundup",
        { date: digestDate }
      );
      console.log("response  ", response);
      setDigestData(response.data.data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (mode) {
      fetchAllData();
    } else {
      fetchAllDailyDigestData();
    }
  }, [mode]);

  useEffect(() => {
    if (digestDate) {
      fetchDailyDigestData();
    }
  }, [digestDate]);

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
        <div>
          {mode ? (
            <div>
              {(allData || []).map((data) => (
                <UrlCard id={data.id} data={data} />
              ))}
            </div>
          ) : digestDate ? (
            <DigestCard data={digestData} setDigestDate={setDigestDate} />
          ) : (
            <div>
              {(dailyDigestData || []).map((data) => (
                <DigestDateCard
                  id={data.id}
                  data={data}
                  setDigestDate={setDigestDate}
                />
              ))}
            </div>
          )}
        </div>
        <div className="loader">
          {status
            ? status === "success"
              ? "Success"
              : status === "failure"
              ? "Failure"
              : "Loading..."
            : null}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
