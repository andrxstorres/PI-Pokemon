// import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import HomeCardContainer from "../../components/HomeCardContainer/index.jsx";
import { useEffect } from "react";
import { getAllPokemons } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  const allPokemons = useSelector((state) => state.pokemons);

  return (
    <div>
      <h1>Home</h1>
      <NavBar />
      <SearchBar />
      <HomeCardContainer allPokemons={allPokemons} />
    </div>
  );
}
