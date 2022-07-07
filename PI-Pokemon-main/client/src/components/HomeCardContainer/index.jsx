import { HomeCard } from "../HomeCard";

export default function HomeCardContainer({ allPokemons }) {
  return (
    <div>
      {allPokemons.map((e) => {
        return <HomeCard key={e.id} pokemonDetails={e} />;
      })}
    </div>
  );
}
