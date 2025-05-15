// LinkBubbles.tsx

import React from "react";
import "../styles/LinkBubbles.css";

export default function LinkBubbles() {
  return (
    <div className="link-bubbles">
      {/* guide bubble */}
      <a
        href="https://minesweepergame.com/strategy/how-to-play-minesweeper.php"
        target="_blank"
        rel="noopener noreferrer"
        className="bubble"
        title="How to Play Minesweeper"
      >
        <img
          src="/images/circle-question-solid.svg"
          alt="Help icon"
          width={32}
          height={32}
        />
      </a>

      {/* github bubble */}
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bubble"
        title="Source Code on GitHub"
      >
        <img
          src="/images/github-brands.svg"
          alt="Help icon"
          width={32}
          height={32}
        />
      </a>
    </div>
  );
}