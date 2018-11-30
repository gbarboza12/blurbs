import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "whatwg-fetch";

import Events from "./events";
import { authHeader } from "../helpers/authheader";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      filter: "",
      category: "",
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadBlurbsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadBlurbsFromServer, 60000);
    }
  }
  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.setState({ pollInterval: null });
  }
  loadBlurbsFromServer = () => {
    const { user } = this.props;
    const {filter} = this.state;

    if (filter === "") {
      fetch(`/api/blurbs/${user._id}`, {
        method: "GET",
        headers: { Authorization: authHeader() }
      })
        .then(data => data.json())
        .then(res => {
          if (!res.success) {
            this.setState({ error: res.error });
            console.log(this.state.error);
          } else {
            this.setState({ data: res.data });
          }
        });
    } else {
      fetch(`/api/blurbs/${user._id}/${filter}`, {
        method: "GET",
        headers: { Authorization: authHeader() }
      })
        .then(data => data.json())
        .then(res => {
          if (!res.success) {
            this.setState({ error: res.error });
            console.log(this.state.error);
          } else {
            this.setState({ data: res.data });
          }
        });
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filter: event.target.value
    }, this.loadBlurbsFromServer);
    //this.loadBlurbsFromServer();
  };

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <div className="headings">
          <h2>Timeline</h2>
          </div>
          <div className="filter">
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel>Filter By...</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                name="category"
              >
                <MenuItem value={"Film"}>Movies</MenuItem>
                <MenuItem value={"Television"}>TV</MenuItem>
                <MenuItem value={"Books"}>Books</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={""}>None</MenuItem>
              </Select>
            </FormControl>
          </form>
        </div>
        <Row>
          <VerticalTimeline animate={false}>
            <Events data={this.state.data} />
          </VerticalTimeline>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}
export default compose(
  withStyles(styles, {
    name: "styles"
  }),
  connect(mapStateToProps)
)(Timeline);
