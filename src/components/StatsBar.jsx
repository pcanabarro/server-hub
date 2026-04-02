export default function StatsBar({ stats, accentColor }) {
  return (
    <div className="stats">
      {stats.map((stat, i) => (
        <div className="stat" key={i}>
          <div className="stat-value" style={accentColor ? { color: accentColor } : undefined}>
            {stat.value}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
