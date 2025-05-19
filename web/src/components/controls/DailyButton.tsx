// DailyButton.tsx

import React from "react";

export default function DailyButton({ loadDaily }: { loadDaily(): void }) {
  return <button onClick={loadDaily}>Daily</button>;
}
