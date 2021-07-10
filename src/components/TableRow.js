import _ from "lodash";
import { formatNumber } from "../util/functions.js";
import { GatsbyImage } from "gatsby-plugin-image";
import "../styles/global.css";

export default function TableRow({ image, champion, noImage }) {
  const chestGranted = (cg) => {
    if (cg === "Chest Earned") {
      return cg;
    }
    return cg ? "True" : "False";
  };

  let style;
  if (champion.chestGranted !== "Chest Earned") {
    style = {
      color: champion.chestGranted ? "lightgreen" : "lightred",
      fontWeight: "bold",
    };
  }

  return (
    <>
      <div key={champion.championId} className="champTableRow">
        <div className="champImageDiv">
          {!noImage && (
            <GatsbyImage
              className="champImage"
              image={image}
              alt=""
              width={30}
              height={30}
            />
          )}
        </div>
        <div>{champion.championName}</div>
        <div>{formatNumber(champion.championPoints)}</div>
        <div>{champion.championLevel}</div>
        <div style={style}>{chestGranted(champion.chestGranted)}</div>
      </div>
    </>
  );
}
