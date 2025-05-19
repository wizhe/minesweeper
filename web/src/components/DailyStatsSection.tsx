import { useDailySummary } from '../hooks/useDailySummary'

export default function DailyStatSection() {
  const summaryUrl = `${process.env.REACT_APP_STATS_API}`;
  const { summary, error } = useDailySummary(summaryUrl);
  function FromatDisplayTime(seconds: number) {
  const secs = Math.round(seconds);
  const m = Math.floor(secs/60), s = secs%60
  const displayTime = `${m}:${s.toString().padStart(2,"0")}`
  return displayTime
  }
  
  if (error) return <div>Error loading summary: {error}</div>;
  if (!summary.length) return <div className= "daily-stats">Loading…</div>;

  return (
    <table className= "daily-stats">
      <thead>
        <tr>
          <th>Date</th><th>Avg Time</th><th>% Perfect</th><th>% No-Flag</th>
        </tr>
      </thead>
      <tbody>
        {summary.map(row => (
          <tr key={row.date}>
            <td>{row.date.slice(0, 10)}</td>
            <td>{FromatDisplayTime(row["avg time"])}</td>
            <td>{(row["% perfect"] * 100).toFixed(1)}%</td>
            <td>{(row["% no-flag"] * 100).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
