// DailyButton.tsx

import React from "react";


interface DailyButtonProps {
  loadGame: (code: string) => void;
}

export default function DailyButton({ loadDaily }: { loadDaily(): void }) {
  return <button onClick={loadDaily}>Daily</button>;
}
