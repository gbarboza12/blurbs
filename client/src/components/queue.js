import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Alert, } from 'reactstrap';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { authHeader } from '../helpers/authheader';
import QueueItems from './queueitems';

const styles = theme => ({
  button: {
	 marginRight: '-5px',
	 marginBottom: '-17px',
	 marginTop: '-5px',
	//  margin: theme.spacing.unit,
	 color: '#EDE7F6 !important',
	 backgroundColor: '#673AB7 !important'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
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
      this.handleInputChange = this.handleInputChange.bind(this);
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
          headers: {'Authorization' : authHeader()}
      }).then(data => data.json())
        .then((res) => {
          if (!res.success) {this.setState({ error: res.error }); console.log(this.state.error)}
          else {this.setState({ items: res.data }); }
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
            addNew: false });
		});
   }
   handleInputChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({
         [name]: value,
         error: null,
      });
   }
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
			if (!res.success) this.setState({ error: res.error});
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
                  <form onSubmit={this.handleSubmit}>
                     <input
                        className="queue-input"
                        placeholder="Title"
                        type="text"
                        name="item"
                        value={this.state.item}
                        onChange={this.handleInputChange}
                     />
                     <button className="btn btn-link btn-queue-add">Add</button>
                     <Dropdown size="sm">
                        <DropdownToggle caret>
                           {this.state.category ? this.state.category : 'Category' }
                        </DropdownToggle>
                        <DropdownMenu>
                           <DropdownItem name="category" value="Film" onClick={this.handleInputChange}>Film</DropdownItem>
                           <DropdownItem name="category" value="Television" onClick={this.handleInputChange}>Television</DropdownItem>
                           <DropdownItem name="category" value="Music" onClick={this.handleInputChange}>Music</DropdownItem>
                           <DropdownItem name="category" value="Book" onClick={this.handleInputChange}>Book</DropdownItem>
                           <DropdownItem name="category" value="Other" onClick={this.handleInputChange}>Other</DropdownItem>
                        </DropdownMenu>
                        (Optional)
                     </Dropdown> 
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