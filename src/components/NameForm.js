import { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";

import { regionNames } from "../util/constants.js";
import "../styles/global.css";

export default function NameForm({
  setSummoner,
  region,
  setRegion,
  masteryData,
}) {
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [noMastery, setNoMastery] = useState(false);

  const getSummoner = async () => {
    setNotFound(false);
    setNoMastery(false);
    if (name === "") {
      console.warn("enter a name before submitting");
      return;
    }
    try {
      const res = await fetch("/.netlify/functions/getSummoner", {
        method: "POST",
        body: JSON.stringify({
          summonerName: name,
          regionName: region,
        }),
      });
      const summoner = await res.json();
      await setSummoner(summoner);
    } catch (err) {
      console.error(`No summoner found with name: ${name}`);
      setNotFound(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getSummoner();
  };

  useEffect(() => {
    if (masteryData.length === 0 && name) {
      console.log("set summoner, mastery data length is 0");
      setNoMastery(true);
    }
  }, [masteryData]);

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          className="nameInput"
          type="text"
          name="summoner-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          placeholder="Summoner Name"
        />
        <StaticImage
          className="searchImage"
          src="../images/Search.png"
          layout="fixed"
          width={30}
          height={30}
          onClick={handleSubmit}
          alt=""
        ></StaticImage>
        <div className="regionDropdown">
          <button className="regionDropdownBtn">{region}</button>
          <div className="regionDropdownContent">
            {Object.keys(regionNames).map((region) => (
              <div
                key={region}
                className="regionSelect"
                onClick={() => setRegion(region)}
              >
                {region}
              </div>
            ))}
          </div>
        </div>
        {notFound ? (
          <div className="notFound">Summoner {name} not found</div>
        ) : (
          <></>
        )}
        {noMastery ? (
          <div className="notFound">Summoner {name} has no mastery</div>
        ) : (
          <></>
        )}
      </form>
      <br />
    </>
  );
}
