// CodeLoader.tsx

import React from "react";

interface CodeLoaderProps {
  importCode: string;
  setImportCode: (code: string) => void;
  loadGame: (code: string) => void;
}

export default function CodeLoader({ importCode, setImportCode, loadGame }: CodeLoaderProps) {
  return (
    <div>
      <button className="load-button" onClick={() => loadGame(importCode)}>Load</button>
      <input
        type="text"
        placeholder="Paste Share Code Here"
        value={importCode}
        onChange={e => setImportCode(e.target.value)}
        className="load-input-box"
      />
    </div>
  );
}
