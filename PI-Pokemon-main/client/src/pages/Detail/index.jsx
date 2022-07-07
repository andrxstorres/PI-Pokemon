import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <div>
      <h1>Detail</h1>
      <Link to="/home">Back</Link>
      <Link to="/create">Create Pokemon</Link>
    </div>
  );
}
