import "../styles/global.css";
import _ from "lodash";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import TableRow from "./TableRow";

export default function MasteryTable({ champData, masteryData }) {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 50)
            }
            name
          }
        }
      }
    }
  `);

  const getIndex = (champName) => {
    return _.findIndex(data.allFile.edges, (obj) => {
      return obj.node.name.toLowerCase() == `${champName}_0`.toLowerCase();
    });
  };

  const getName = (championId) => {
    return champData[
      _.findKey(champData, (champ) => {
        return champ.key === String(championId);
      })
    ].id;
  };

  const getChampImage = (championId) => {
    const champName = getName(championId);
    const index = getIndex(champName);
    const img = getImage(data.allFile.edges[index].node.childImageSharp);
    return img;
  };

  return (
    <div className="champTable">
      {masteryData.length > 0 && (
        <TableRow
          champion={{
            championName: "Champion",
            championPoints: "Mastery Points",
            championLevel: "Mastery Level",
            chestGranted: "Chest Earned",
          }}
          noImage={true}
        />
      )}
      {masteryData.map((champion) => (
        <TableRow
          key={champion.championId}
          champion={Object.assign(champion, {
            championName: getName(champion.championId),
          })}
          image={getChampImage(champion.championId)}
        />
      ))}
    </div>
  );
}
