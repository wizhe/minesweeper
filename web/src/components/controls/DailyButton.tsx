// DailyButton.tsx

import React from "react";

const DAILY_CODE = "MTQsMjIsMTEwLDE3NDcyMjIyODYyODcsNCwxMQ==";

interface DailyButtonProps {
  loadGame: (code: string) => void;
}

export default function DailyButton({ loadGame }: DailyButtonProps) {
  return <button onClick={() => loadGame(DAILY_CODE)} style={{ background: "#8ee" }}>Daily</button>;
}
