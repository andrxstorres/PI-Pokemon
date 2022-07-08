import { Link } from "react-router-dom";
import landingGif from "../../images/landing_gif.gif";

export default function Landing() {
  return (
    <div>
      <h1>Pokemon PI</h1>
      <img src={landingGif} alt="Landing Gif" />
      <Link to="/home">Home</Link>
    </div>
  );
}
