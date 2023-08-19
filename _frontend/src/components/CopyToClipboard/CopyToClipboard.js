import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./CopyToClipboard.css";
const CopyToClipboardComp = ({ value }) => {
  const [text, setText] = useState("Copy");
  const copiedMessage = () => {
    setText("Copied");
    setTimeout(() => {
      setText("Copy");
    }, 2000);
  };
  return (
    <div className="copyToClipboard">
      <p className="valueToCopy">{value}</p>
      <CopyToClipboard text={value} onCopy={copiedMessage}>
        <button type="button" className="btn copyTextBtn">
          {text}{" "}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyToClipboardComp;
