// import { useState } from "react";
// import { useSelector } from "react-redux";
import DetailCard from "../DetailCard";

export default function DetailContainer({ details }) {
  // const [localState, setLocal] = useState({});

  // const newDetails = useSelector((state) => state.details);

  const { id, name, image, types, stats, height, weight } = details;

  return (
    <>
      <DetailCard id={id} name={name} image={image} types={types} stats={stats} height={height} weight={weight} />
    </>
  );
}
