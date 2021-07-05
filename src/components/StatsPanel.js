export default function StatsPanel({ champData, masteryData }) {
  if (masteryData.length === 0) {
    return <></>;
  }

  const { championPoints } = masteryData.reduce((a, b) => ({
    championPoints: a.championPoints + b.championPoints,
  }));

  const { championLevel: championLevels5 } = masteryData.reduce((a, b) => ({
    championLevel:
      a.championLevel + (b.championLevel <= 5 ? b.championLevel : 5),
  }));

  const { championLevel: championLevels7 } = masteryData.reduce((a, b) => ({
    championLevel: a.championLevel + b.championLevel,
  }));

  const totalMasteryLevels5 = Object.keys(champData).length * 5;
  const totalMasteryLevels7 = Object.keys(champData).length * 7;

  // const totalMasteryScore = 5;
  console.log(championPoints);

  return (
    <div className="statsPanel">
      <h3>Stats Panel!</h3>
      <p>{championPoints} Total Points</p>

      <h4>Progress</h4>
      <div className="statsContainer">
        <div className="stat">
          <p className="statLabel">Mastery 5</p>
          <p className="statStat">
            {championLevels5} / {totalMasteryLevels5}
          </p>
        </div>
        <div className="stat">
          <p className="statLabel">Mastery 7</p>
          <p className="statStat">
            {championLevels7} / {totalMasteryLevels7}
          </p>
        </div>
      </div>
    </div>
  );
}
