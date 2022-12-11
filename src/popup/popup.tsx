import React, { useState, useEffect } from "react";
import "../assets/tailwind.css";
import { createRoot } from "react-dom/client";
const axios = require("axios");
import UrlCard from "./urlcard";

const Popup = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [mode, setMode] = useState(true);
  const [status, setStatus] = useState(null);
  const [similarData, setSimilarData] = useState([
    {
      id: "assdsad",
      date: "2019-12-11",
      url: "https://google.com",
      title: "Some title........",
      content: "Big content",
      summary: "aslkasldmlsmdlsmdl;msl;adm;lsaml;dmsa",
      tags: "tag1, tag2, tag3",
      thumbnail_file: "https://pocketgpt1.saumopal97.repl.co/static/icon.png",
      audio_file: "https://pocketgpt1.saumopal97.repl.co/static/audio.mp3",
    },
    {
      id: "assdsad",
      date: "2019-12-11",
      url: "https://google.com",
      title: "Some title........",
      content: "Big content",
      summary: "aslkasldmlsmdlsmdl;msl;adm;lsaml;dmsa",
      tags: "tag1, tag2, tag3",
      thumbnail_file: "https://pocketgpt1.saumopal97.repl.co/static/icon.png",
      audio_file: "https://pocketgpt1.saumopal97.repl.co/static/audio.mp3",
    },
    {
      id: "assdsad",
      date: "2019-12-11",
      url: "https://google.com",
      title: "Some title........",
      content: "Big content",
      summary: "aslkasldmlsmdlsmdl;msl;adm;lsaml;dmsa",
      tags: "tag1, tag2, tag3",
      thumbnail_file: "https://pocketgpt1.saumopal97.repl.co/static/icon.png",
      audio_file: "https://pocketgpt1.saumopal97.repl.co/static/audio.mp3",
    },
  ]);

  useEffect(() => {
    if (status === "success" || status === "failure") {
      setTimeout(() => setStatus(null), 3000);
    }
  }, [status]);

  useEffect(() => {
    chrome.windows.getCurrent(function (w) {
      chrome.tabs.query({ active: true }, (tabs) => {
        const tab = tabs[0];
        setCurrentUrl(tab.url);
      });
    });
  }, []);

  const saveUrl = async () => {
    if (currentUrl) {
      try {
        setStatus("loading");
        const response = await axios.post(
          "https://PocketGPT1.saumopal97.repl.co/v1/api/save",
          { url: currentUrl }
        );
        console.log("response  ", response);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }
  };

  const showSimilarUrls = async () => {
    if (currentUrl) {
      try {
        setStatus("loading");
        const response = await axios.post(
          "https://PocketGPT1.saumopal97.repl.co/v1/api/similar",
          { url: currentUrl }
        );
        console.log("response  ", response);
        setSimilarData(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("failure");
        setSimilarData([]);
      }
    }
  };

  const toggleMode = () => {
    setMode(!mode);
  };

  return (
    <div className="p-10">
      <span className="mb-5 text-lg font-mono font-bold text-orange-600	">
        PocketGPT
      </span>
      <div className="text-md my-5 mx-10 flex flex-row justify-between text-orange-800 font-normal">
        <span
          onClick={toggleMode}
          className={`${
            mode
              ? "font-extrabold underline decoration-solid underline-offset-4"
              : ""
          }`}
        >
          Save URL
        </span>
        <span
          onClick={toggleMode}
          className={`${
            !mode
              ? "font-extrabold underline decoration-solid underline-offset-4"
              : ""
          }`}
        >
          Search Similar Content
        </span>
      </div>
      {mode ? (
        <div className="border-solid border-2 border-orange-300 p-10 rounded-md flex flex-row">
          <span className="border-solid border border-gray-300 bg-gray-100 truncate max-h-fit min-h-fit px-2 py-1">
            {currentUrl}
          </span>
          <button
            onClick={saveUrl}
            className="ml-5 border border border-solid border-orange-300 rounded-sm px-2 py-1"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center py-5 rounded-md">
          <button
            onClick={showSimilarUrls}
            className="ml-5 border border border-solid border border-orange-300 rounded-sm px-2 py-1 flex flex-row text-center justify-center items-center"
          >
            Show similar content
          </button>
          {similarData.length ? (
            <div>
              {(similarData || []).map((data) => (
                <UrlCard id={data.id} data={data} />
              ))}
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-row text-center justify-center items-center mt-5">
        {status
          ? status === "success"
            ? "Success"
            : status === "failure"
            ? "Failure"
            : "Loading..."
          : null}
      </div>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);
