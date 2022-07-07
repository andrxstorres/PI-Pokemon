import React from "react";
import { connect } from "react-redux";
import { getPokemonByName } from "../../redux/actions.js";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  onChangeHandler = (e) => {
    // console.log(e);
    this.setState((state) => {
      return { text: e.target.value };
    });
  };

  onSearch = (e) => {
    e.preventDefault();
    this.props.getPokemonByName(this.state.text);
  };

  render() {
    return (
      <>
        <form action="" onSubmit={(e) => this.onSearch(e)}>
          <input type="text" placeholder="Search..." onChange={(e) => this.onChangeHandler(e)} />
          <button type="submit">🔎</button>
          {/* <input type="submit">🔎</input> */}
        </form>
      </>
    );
  }
}

export function mapStateToProps(state) {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    getPokemonByName: (name) => dispatch(getPokemonByName(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
