import { useState } from "react";
import { useSelector } from "react-redux";

export default function DetailCard() {
  // const [localState, setLocal] = useState({});

  const newDetails = useSelector((state) => state.details);

  console.log(newDetails);
  const { image, name, types, hp, attack, defense, speed, height, weight, id } = newDetails;

  return (
    <div>
      <ul>
        <li>${image}</li>
        <li>${name}</li>
        <li>${types[0]}</li>
        <li>${hp}</li>
        <li>${attack}</li>
        <li>${defense}</li>
        <li>${speed}</li>
        <li>${height}</li>
        <li>${weight}</li>
        <li>${id}</li>
      </ul>
    </div>
  );
}
