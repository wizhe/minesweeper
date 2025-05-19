// DailyButton.tsx

import React from "react";

export default function DailyButton({ loadDaily }: { loadDaily(): void }) {
  return <button className="daily-button" onClick={loadDaily}>Daily</button>;
}
