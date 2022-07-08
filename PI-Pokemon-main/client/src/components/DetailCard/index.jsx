// import { useState } from "react";
// import { useSelector } from "react-redux";

export default function DetailCard({ id, name, image, types, stats, height, weight }) {
  // const [localState, setLocal] = useState({});

  let arrStats;
  if (stats) arrStats = Object.getOwnPropertyNames(stats).map((s) => `${s}:${stats[s]}`);

  return (
    <div>
      <img src={image} alt={`${name}'s Official Artwork`} />
      <p>Types</p>
      <ul>
        {types &&
          types.map((type) => {
            if (typeof type === "object") {
              return <li key={type.name}>{type.name}</li>;
            }
            return <li key={type}>{type}</li>;
          })}
      </ul>
      <p>Stats</p>
      <ul>
        {stats && arrStats.map((stat) => <li key={stat}>{stat}</li>)}
        <li>Height:{height}</li>
        <li>Weight:{weight}</li>
      </ul>
    </div>
  );
}
