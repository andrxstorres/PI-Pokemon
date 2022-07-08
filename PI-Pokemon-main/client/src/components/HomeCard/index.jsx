import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import altImage from "../../images/pokeball_gif.gif";

export class HomeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // const { image, name, types } = this.props.pokemonDetails;
  }
  //
  render() {
    const { image, name, types, id } = this.props.pokemonDetails;
    return (
      <Link to={`/details/${id}`}>
        <div>
          {image ? <img src={image} alt={`Pokemon ${name} official artwork`} /> : <img src={altImage} alt={`${name}'s Official Artwork`} width="300px" />}
          <p>{name}</p>
          <ul>
            {types.map((e) => {
              return <li key={e}>{e}</li>;
            })}
          </ul>
        </div>
      </Link>
    );
  }
}

// export function mapStateToProps(state) {
//   return {};
// }

// export function mapDispatchToProps(dispatch) {
//   return {
//     // getPokemonByName: (name) => dispatch(getPokemonByName(name)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
