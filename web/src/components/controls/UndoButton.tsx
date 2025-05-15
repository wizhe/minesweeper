// UndoButton.tsx

import React from "react";

interface UndoButtonProps {
  onUndo: () => void;
  disabled?: boolean;
}

export default function UndoButton({ onUndo, disabled = false }: UndoButtonProps) {
  return (
    <button
      className="undo-button"
      onClick={onUndo}
      disabled={disabled}
      onContextMenu={e => e.preventDefault()}
      title="Undoes your mine reveal, adds 5-second penalty"
    >
      ↩ Undo
    </button>
  );
}