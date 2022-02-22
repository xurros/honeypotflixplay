import React from "react";
import { connect } from "react-redux";

// Import actions
import { setFilter } from "../../actions/actions";

// Import React Bootstrap components
import Form from "react-bootstrap/Form";

// Import Custom SCSS
import "./visibility-filter.scss";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="search-bar"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search for a movie..."
    />
  );
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
