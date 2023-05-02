import React from "react";

export const BlockQuote = ({ data }) => {
  return (
    <blockquote className="o-content-grid u-mt--80 u-mb--80">
      <div className="content">
        {data.title && <span className="u-c--light u-mb--32">{data.title}</span>}
        {data.content && <h2>{data.content}</h2>}
      </div>
    </blockquote>
  );
};

export default BlockQuote;
