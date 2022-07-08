// import { Link } from "react-router-dom";
import { useState } from "react";
import CreateForm from "../../components/CreateForm";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions";

export default function Create() {
  const dispatch = useDispatch();

  useState(() => {
    dispatch(getAllTypes(), [dispatch]);
  });

  const types = useSelector((state) => state.types);
  // const typesArray = Object.values(types);
  // console.log("dentro de Create");
  // console.log(typesArray);
  const typesNames = types.map((type) => {
    return type.name;
  });

  return (
    <div>
      <NavBar />
      <h1>Create your Pokemon!</h1>
      <CreateForm types={typesNames} />
    </div>
  );
}
