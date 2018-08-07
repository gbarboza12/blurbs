import React, { Component } from 'react';
import './css/queue.css';
import * as FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#86e6a5',
    '&$checked': {
      color: '#86e6a5',
    },
    height: '30px !important',
    width: '32px !important',
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

class QueueItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  delete(id) {
    this.props.delete(id);
  }
  complete(id, current) {
    this.props.complete(id, current);
  }
  getIcon(category) {
    if (category === 'Film') {
      return <FontAwesome name="film" style={{ color: this.getIconColor(category) }} />;
    } else if (category === 'Television') {
      return <FontAwesome name="tv" style={{ color: this.getIconColor(category) }} />;
    } else if (category === 'Book') {
      return <FontAwesome name="book" style={{ color: this.getIconColor(category) }} />;
    } else if (category === 'Music') {
      return <FontAwesome name="headphones" style={{ color: this.getIconColor(category) }} />;
    } else {
      return <FontAwesome name="star" style={{ color: this.getIconColor(category) }} />;
    }
  }
  getIconColor(category) {
    if (category === 'Film') {
      return '#ff70a6';
    } else if (category === 'Television') {
      return '#ff9770';
    } else if (category === 'Book') {
      return '#ffd670';
    } else if (category === 'Music') {
      return '#8670ff';
    } else {
      return '#70d6ff';
    }
  }
  createTasks(item) {
    const { classes } = this.props;
    return (
      <div key={item.key} className="row-queue">
        <div className="col-8">
          <label className={item.completed ? 'label-complete' : 'label-incomplete'}>
            <Checkbox
              checked={item.completed}
              value={item.completed}
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
              onClick={() => this.complete(item._id, item.completed)}
            />
            {item.item}
          </label>
          {item.category ?
            <div className="queue-category">
              {this.getIcon(item.category)}{'  '}
              {item.category}
            </div>
            : <br />}
        </div>
        <div className="col-4 text-center">
          <i className="far fa-trash-alt delete-icon" onClick={() => this.delete(item._id)} />
        </div>
      </div>
    );
  }

  render() {
    var queueEntries = this.props.entries;
    var listItems = queueEntries.map(this.createTasks);
    return (
      <div >
        {queueEntries.length !== 0 ?
          <div className="queue-content">
            {listItems}
          </div>
          :
          <div className="queue-content">
            <div className="row-queue">
              <p className="no-entries">No entries added yet!</p>
            </div>
          </div>
        }
      </div>
    );
  }
}
QueueItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueueItems);