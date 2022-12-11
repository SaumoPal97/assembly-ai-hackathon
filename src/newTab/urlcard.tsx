import React from "react";
import ReactAudioPlayer from "react-audio-player";
import "./urlcard.css";

function UrlCard({ id, data }) {
  return (
    <div
      id={id}
      className="datacontainer"
      onClick={() => window.open(data.url, "_blank")}
    >
      <div className="topcontainer">
        {data.thumbnail_file ? (
          <img className="image" src={data.thumbnail_file} />
        ) : null}
        <div className="content-container">
          <span className="urltitle">{data.title}</span>
          <span className="date">{`Saved on ${data.date}`}</span>
        </div>
      </div>
      <div className="content">{data.summary}</div>
      <div className="tag-container">
        {(data.tags || "")
          .split(",")
          .map((tag) => (tag ? <span className="tag">{tag}</span> : null))}
      </div>
      {data.audio_file ? (
        <ReactAudioPlayer src={data.audio_file} controls />
      ) : null}
    </div>
  );
}

export default UrlCard;
