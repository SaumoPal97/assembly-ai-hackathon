import React from "react";
import "./digestdatecard.css";

function DigestDateCard({ id, data, setDigestDate }) {
  return (
    <div
      id={id}
      className="datacontainer"
      onClick={() => setDigestDate(data.date)}
    >
      <div className="topcontainer">
        <div className="content-container">
          <span className="date">{`${data.date}`}</span>
        </div>
      </div>
    </div>
  );
}

export default DigestDateCard;
