import React from "react";
import ReactAudioPlayer from "react-audio-player";
import "./urlcard.css";

function DigestCard({ data, setDigestDate }) {
  return (
    <>
      <span className="back" onClick={() => setDigestDate(null)}>
        {`< Back`}
      </span>
      <div className="datacontainer">
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
        {data.audio_file ? (
          <ReactAudioPlayer src={data.audio_file} controls />
        ) : null}
      </div>
    </>
  );
}

export default DigestCard;
