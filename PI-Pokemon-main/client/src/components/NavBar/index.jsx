import React from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../SearchBar";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "",
    };
  }

  render() {
    return (
      <>
        <Link to="/home">Home</Link>
        <Link to="/create">Create Pokemon</Link>
      </>
    );
  }
}
