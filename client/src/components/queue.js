import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";
import Button from "@material-ui/core/Button";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { authHeader } from "../helpers/authheader";
import QueueItems from "./queueitems";
import AddQueue from "./addqueue";

const styles = theme => ({
  button: {
    marginRight: "-5px",
    marginBottom: "-17px",
    marginTop: "-5px",
    color: "#EDE7F6 !important",
    backgroundColor: "#673AB7 !important",
    verticalAlign: "middle"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      item: "",
      items: [],
      error: null,
      addNew: false,
      sorted: ""
    };
    this.pollInterval = null;

    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.sortCategory = this.sortCategory.bind(this);
    this.addItem = this.addItem.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  componentDidMount() {
    this.loadQueueEntriesFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadQueueEntriesFromServer, 60000);
    }
  }
  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.setState({ pollInterval: null });
  }
  loadQueueEntriesFromServer = () => {
    const { user } = this.props;
    const { sorted } = this.state;

    if (sorted === "") {
      fetch(`/api/queue/${user._id}`, {
        method: "GET",
        headers: { Authorization: authHeader() }
      })
        .then(data => data.json())
        .then(res => {
          if (!res.success) {
            this.setState({ error: res.error });
            console.log(this.state.error);
          } else {
            this.setState({ items: res.data });
          }
        });
    } else {
      fetch(`/api/queue/${user._id}/${sorted}`, {
        method: "GET",
        headers: { Authorization: authHeader() }
      })
        .then(data => data.json())
        .then(res => {
          if (!res.success) {
            this.setState({ error: res.error });
            console.log(this.state.error);
          } else {
            this.setState({ items: res.data });
          }
        });
    }
  };
  deleteItem(queueId) {
    var filteredItems = this.state.items.filter(function(item) {
      return item.key !== queueId;
    });

    const { user } = this.props;
    fetch(`/api/queue/${user._id}/${queueId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authHeader()
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else
          this.setState({
            items: filteredItems,
            error: null
          });
      });
    this.loadQueueEntriesFromServer();
  }
  completeItem(queueId, current) {
    const completed = !current;
    const { user } = this.props;
    fetch(`/api/queue/${user._id}/${queueId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authHeader()
      }),
      body: JSON.stringify({ completed, user })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          this.setState({
            error: res.error.message || res.error
          });
          console.log(this.state.error);
        } else
          this.setState({
            error: null,
            ...this.state,
            items: this.state.items.map(item =>
              item._id === queueId ? { ...item, completed: !current } : item
            )
          });
      });
  }
  sortCategory(category) {
    this.setState({ sorted: category }, this.loadQueueEntriesFromServer);
  }
  addItem() {
    this.setState({ addNew: !this.state.addNew });
    this.loadQueueEntriesFromServer();
  }
  errorMessage(msg) {
    this.setState({ error: msg });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      sorted: event.target.value
    });
    this.loadQueueEntriesFromServer();
  };

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <div className="headings">
          <h2>Queue</h2>
        </div>

        {this.state.error ? (
          <Alert color="danger">Error: {this.state.error}</Alert>
        ) : null}

        {!this.state.addNew ? (
          <div className="text-right">
            <Button
              variant="fab"
              mini
              color="primary"
              aria-label="Add"
              className={classes.button}
              onClick={this.addItem}
            >
              <i className="fa fa-plus my-float" />
            </Button>
          </div>
        ) : null}

        {this.state.addNew ? (
          <AddQueue addItem={this.addItem} errorMessage={this.errorMessage} />
        ) : null}
        {this.state.sorted ? (
          <a href="#" onClick={() => this.sortCategory("")}>
            Show All
          </a>
        ) : null}

        <QueueItems
          entries={this.state.items}
          delete={this.deleteItem}
          complete={this.completeItem}
          sort={this.sortCategory}
        />
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}
Queue.propTypes = {
  classes: PropTypes.object.isRequired
};
export default compose(
  withStyles(styles, {
    name: "styles"
  }),
  connect(mapStateToProps)
)(Queue);
