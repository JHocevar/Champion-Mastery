import { formatNumber } from "../util/functions";

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

  const { championLevel: championsLevel5 } = masteryData.reduce(
    (a, b) => ({
      championLevel: a.championLevel + (b.championLevel >= 5 ? 1 : 0),
    }),
    { championLevel: 0 }
  );

  const { championLevel: championsLevel6 } = masteryData.reduce(
    (a, b) => ({
      championLevel: a.championLevel + (b.championLevel >= 6 ? 1 : 0),
    }),
    { championLevel: 0 }
  );

  const { championLevel: championsLevel7 } = masteryData.reduce(
    (a, b) => ({
      championLevel: a.championLevel + (b.championLevel === 7 ? 1 : 0),
    }),
    { championLevel: 0 }
  );

  const { chestGranted } = masteryData.reduce((a, b) => ({
    chestGranted: a.chestGranted + b.chestGranted,
  }));

  const totalChamps = Object.keys(champData).length;
  const totalMasteryLevels5 = totalChamps * 5;
  const totalMasteryLevels7 = totalChamps * 7;

  return (
    <div className="statsPanel">
      <h3>Stats Panel!</h3>
      <p>{formatNumber(championPoints)} Total Points</p>

      <h4>Progress</h4>
      <div className="statsContainer">
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(championLevels7 / totalMasteryLevels7) * 100}%`,
            }}
          />
          <p className="statLabel">Mastery Levels (all)</p>
          <p className="statStat">
            {championLevels7} / {totalMasteryLevels7}
          </p>
        </div>
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(championLevels5 / totalMasteryLevels5) * 100}%`,
            }}
          />
          <p className="statLabel">Mastery Levels (up to 5)</p>
          <p className="statStat">
            {championLevels5} / {totalMasteryLevels5}
          </p>
        </div>
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(championsLevel5 / totalChamps) * 100}%`,
            }}
          />
          <p className="statLabel">Level 5 Champs</p>
          <p className="statStat">
            {championsLevel5} / {totalChamps}
          </p>
        </div>
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(championsLevel6 / totalChamps) * 100}%`,
            }}
          />
          <p className="statLabel">Level 6 Champs</p>
          <p className="statStat">
            {championsLevel6} / {totalChamps}
          </p>
        </div>
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(championsLevel7 / totalChamps) * 100}%`,
            }}
          />
          <p className="statLabel">Level 7 Champs</p>
          <p className="statStat">
            {championsLevel7} / {totalChamps}
          </p>
        </div>
        <div className="stat">
          <div
            className="progressbar"
            style={{
              width: `${(chestGranted / totalChamps) * 100}%`,
            }}
          />
          <p className="statLabel">Chests Claimed</p>
          <p className="statStat">
            {chestGranted} / {totalChamps}
          </p>
        </div>
      </div>
    </div>
  );
}
