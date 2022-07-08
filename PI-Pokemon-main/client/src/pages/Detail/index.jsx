import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import DetailContainer from "../../components/DetailContainer";
import { getDetailsById } from "../../redux/actions";

export default function Detail() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { id } = useParams();
  console.log(id);

  const idNum = Number(id);
  console.log(idNum);
  useEffect(() => {
    dispatch(getDetailsById(idNum));
  }, [dispatch, idNum]);

  const details = useSelector((state) => state.details);
  const { name } = details;
  // name === undefined && history.push("/home");

  return (
    <div>
      <h1>{`${name}'s Details`}</h1>
      {/* {Number(id) && <p>{`#${id}`}</p>} */}
      <Link to="/home">Back</Link>
      <DetailContainer details={details} />
    </div>
  );
}
