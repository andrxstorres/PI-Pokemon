import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default class NavBar extends React.Component {
  render() {
    return (
      <>
        <Link to="/create">Create Pokemon</Link>
        <SearchBar />
      </>
    );
  }
}
