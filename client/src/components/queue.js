import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Alert, Container } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { authHeader } from '../helpers/authheader';
import QueueItems from './queueitems';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: 15,
    marginRight: theme.spacing.unit,
    width: 200,
    flexBasis: 200,
  },
  tfSelect: {
    width: 100,
  },
  buttonAdd: {
    color: '#673AB7 !important',
  },
  button: {
    marginRight: '-5px',
    marginBottom: '-17px',
    marginTop: '-5px',
    color: '#EDE7F6 !important',
    backgroundColor: '#673AB7 !important'
  },
});

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      item: '',
      items: [],
      error: null,
      addNew: false,
    };
    this.pollInterval = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTFChange = this.handleTFChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    this.loadQueueEntriesFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadQueueEntriesFromServer, 2000);
    }
  }
  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  loadQueueEntriesFromServer = () => {
    const { user } = this.props;

    fetch(`/api/queue/${user._id}`, {
      method: 'GET',
      headers: { 'Authorization': authHeader() }
    }).then(data => data.json())
      .then((res) => {
        if (!res.success) { this.setState({ error: res.error }); console.log(this.state.error) }
        else { this.setState({ items: res.data }); }
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const item = this.state.item;
    const category = this.state.category;
    const completed = false;
    const date = new Date().toISOString();
    const { user } = this.props;

    if (!item) {
      this.setState({
        error: 'Please fill in all of the fields.'
      })
      return;
    }
    fetch('/api/queue', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      }),
      body: JSON.stringify({ item, category, completed, date, user }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) {
        this.setState({ error: res.error.message || res.error, alertText: 'Error' });
        console.log(this.state.error)
      }
      else this.setState({
        item: '',
        category: '',
        error: null,
        addNew: false
      });
    });
  }
  handleTFChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  deleteItem(queueId) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== queueId);
    });

    const { user } = this.props;
    fetch(`/api/queue/${user._id}/${queueId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error });
      else this.setState({
        items: filteredItems,
        error: null,
      });
    });
  }
  completeItem(queueId, current) {
    console.log(current)
    const completed = !current;
    const { user } = this.props;
    fetch(`/api/queue/${user._id}/${queueId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': authHeader()
      }),
      body: JSON.stringify({ completed, user }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) {
        this.setState({
          error: res.error.message || res.error,
        });
        console.log(this.state.error)
      } else this.setState({
        error: null,
        ...this.state,
        items: this.state.items.map(item => item._id === queueId ?
          { ...item, completed: !current } : item
        )
      });
    });
  }
  addItem() {
    this.setState({ addNew: true })
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <div className="headings">
          <h3>Queue</h3>
        </div>

        {this.state.error ?
          <Alert color="danger">Error: {this.state.error}</Alert>
          : null}

        {!this.state.addNew ?
          <div className="text-right">
            <Button variant="fab" mini color="primary" aria-label="Add" className={classes.button} onClick={this.addItem}>
              <i className="fa fa-plus my-float" ></i>
            </Button>
          </div>
          : null
        }

        {this.state.addNew ?
          <div className="queue-content">
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                label="Entry"
                className={classNames(classes.margin, classes.textField)}
                value={this.state.item}
                onChange={this.handleTFChange('item')}
                margin=""
              />
              <TextField
                select
                label="Category"
                className={classNames(classes.margin, classes.tfSelect)}
                value={this.state.category}
                onChange={this.handleTFChange('category')}
              >
                <MenuItem value={'Film'}>Movies</MenuItem>
                <MenuItem value={'Television'}>TV</MenuItem>
                <MenuItem value={'Books'}>Books</MenuItem>
                <MenuItem value={'Music'}>Music</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </TextField> 
              <Button className={classes.buttonAdd} onClick={this.handleSubmit}>Add</Button>
            </form>
          </div>
          : null
        }
        <QueueItems entries={this.state.items} delete={this.deleteItem} complete={this.completeItem} />
      </Container>
    )
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
  classes: PropTypes.object.isRequired,
};
export default compose(
  withStyles(styles, {
    name: 'styles',
  }),
  connect(mapStateToProps),
)(Queue);