// ShareCodeBox.tsx

import React, { useState } from "react";

interface ShareCodeBoxProps {
  shareCode: string;
}

export default function ShareCodeBox({ shareCode }: ShareCodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareCode);
      setCopied(true);
      // reset “Copied”
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="share-code-box">
      <label htmlFor="share-code">Share: </label>
      <input
        id="share-code"
        type="text"
        readOnly
        value={shareCode}
        onFocus={e => (e.target as HTMLInputElement).select()}
      />
      <button onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}