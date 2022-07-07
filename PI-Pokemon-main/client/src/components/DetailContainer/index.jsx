import { useState } from "react";
import { useSelector } from "react-redux";
import DetailCard from "../DetailCard";

export default function DetailContainer() {
  const [localState, setLocal] = useState({});

  const newDetails = useSelector((state) => state.details);

  console.log(newDetails);

  return (
    <>
      <DetailCard />
    </>
  );
}
