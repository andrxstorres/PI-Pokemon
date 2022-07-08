import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";

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
          <img src={image} alt={`Pokemon ${name} official artwork`} />
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
