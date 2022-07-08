// import { useState } from "react";
// import { useSelector } from "react-redux";
import DetailCard from "../DetailCard";
import altImage from "../../images/pokeball_gif.gif";

export default function DetailContainer({ details }) {
  // const [localState, setLocal] = useState({});

  // const newDetails = useSelector((state) => state.details);

  const { id, name, image, types, stats, hp, attack, defense, speed, height, weight } = details;

  let statsObj = stats;
  if (hp && attack && defense && speed) statsObj = { hp, attack, defense, speed };

  return (
    <>
      <DetailCard id={id} name={name} image={image} altImage={altImage} types={types} stats={statsObj} height={height} weight={weight} />
    </>
  );
}
