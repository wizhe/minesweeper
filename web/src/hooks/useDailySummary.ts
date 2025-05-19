// web/src/hooks/useDailySummary.ts

import { useState, useEffect } from "react";

interface SummaryRow {
  date: string;
  games: number;
  "avg time": number;
  "% perfect": number;
  "% no-flag": number;
}

export function useDailySummary(url: string) {
  const [summary, setSummary] = useState<SummaryRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SummaryRow[]) => setSummary(data))
      .catch(err => setError(err.message));
  }, [url]);

  return { summary, error };
}
