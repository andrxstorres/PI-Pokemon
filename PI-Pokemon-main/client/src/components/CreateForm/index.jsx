import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function CreateForm({ types }) {
  const [formData, setFormData] = useState({
    name: "",
    types: [],
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const setTypes = (e) => {
    if (formData.types.includes(e.target.name)) {
      setFormData((prevState) => {
        return {
          ...prevState,
          types: prevState.types.filter((type) => type !== e.target.name),
        };
      });
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          types: [...prevState.types, e.target.name],
        };
      });
    }
  };

  const onChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createPokemon(formData));
  };

  let lastCreated = useSelector((state) => state.details);
  if (lastCreated.name === formData.name) history.push(`/details/${lastCreated.id}`);

  return (
    <>
      <form action="" onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" required onChange={onChangeHandler} />
        <br />
        {/* <label htmlFor="types">Types: </label> */}
        <fieldset>
          <legend>Types</legend>
          {types.map((type) => {
            return (
              <div key={type}>
                <label>
                  {type}
                  <input type="checkbox" name={type} onChange={setTypes} />
                </label>
              </div>
            );
          })}
        </fieldset>
        <br />
        <br />
        <fieldset>
          <legend>Stats</legend>
          <label htmlFor="hp">Health Points: </label>
          <input type="number" id="hp" name="hp" required min="1" onChange={onChangeHandler} />
          <br />
          <label htmlFor="attack">Attack: </label>
          <input type="number" id="attack" name="attack" required min="1" onChange={onChangeHandler} />
          <br />
          <label htmlFor="defense">Defense: </label>
          <input type="number" id="defense" name="defense" required min="1" onChange={onChangeHandler} />
          <br />
          <label htmlFor="speed">Speed: </label>
          <input type="number" id="speed" name="speed" required min="1" onChange={onChangeHandler} />
          <br />
          <label htmlFor="height">Height: </label>
          <input type="number" id="height" name="height" required min="1" onChange={onChangeHandler} />
          <br />
          <label htmlFor="weight">Weight: </label>
          <input type="number" id="weight" name="weight" required min="1" onChange={onChangeHandler} />
        </fieldset>

        <button type="submit">Create!</button>
      </form>
    </>
  );
}
