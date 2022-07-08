// import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import HomeCardContainer from "../../components/HomeCardContainer/index.jsx";
import { useEffect } from "react";
import { getAllPokemons } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { useHistory } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  const allPokemons = useSelector((state) => state.pokemons);
  const searchError = useSelector((state) => state.searchError);
  const gettingAllError = useSelector((state) => state.gettingAllError);

  return (
    <div>
      <h1>Home</h1>
      <NavBar />
      <SearchBar />
      <HomeCardContainer allPokemons={allPokemons} />
      {searchError === 400 && alert(`That Pokemon doesn't exists!`)}
      {gettingAllError === 400 && alert(`A network error ocurred, try again later!`)}
    </div>
  );
  // }
}
