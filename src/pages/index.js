import { useEffect, useState } from "react";
import _ from "lodash";

import NameForm from "../components/NameForm";
import MasteryTable from "../components/MasteryTable";
import StatsPanel from "../components/StatsPanel";
import "../styles/global.css";

const IndexPage = () => {
  const [summoner, setSummoner] = useState({});
  const [region, setRegion] = useState("NA");
  const [masteryData, setMasteryData] = useState([]);
  const [champData, setChampData] = useState([]);

  const updateSummoner = async (summoner) => {
    setSummoner(summoner);
    await getMasteryData(summoner);
  };

  const getMasteryData = async (summoner) => {
    try {
      const res = await fetch("/.netlify/functions/getMastery", {
        method: "POST",
        body: JSON.stringify({
          summonerId: summoner.id,
          regionName: region,
        }),
      });
      const masteryData = await res.json();
      setMasteryData(masteryData);
    } catch (err) {
      console.error(`Error retrieving mastery data!`);
    }
  };

  const loadChamps = async () => {
    try {
      const res = await fetch("/.netlify/functions/getChamps");
      const champData = await res.json();
      setChampData(champData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadChamps();
  }, []);

  return (
    <>
      <div className="content">
        <h1>Champion Mastery</h1>
        <h4>Enter a Summoner name</h4>
        <NameForm
          setSummoner={updateSummoner}
          region={region}
          setRegion={setRegion}
        />
        <div className="mainContent">
          <MasteryTable champData={champData} masteryData={masteryData} />
          <StatsPanel champData={champData} masteryData={masteryData} />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
