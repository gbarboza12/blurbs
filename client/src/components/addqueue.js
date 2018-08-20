import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { authHeader } from '../helpers/authheader';

const styles = theme => ({
   container: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   margin: {
      margin: theme.spacing.unit,
      marginRight: 13,
      marginLeft: 20,
   },
   textField: {
      marginRight: theme.spacing.unit,
      width: 200,
      flexBasis: 200,
   },
   tfSelect: {
      width: 100,
   },
   buttonAdd: {
      color: '#673AB7 !important',
      marginBottom: '10px',
      marginTop: '10px',
   },
   button: {
      marginRight: '-5px',
      marginBottom: '-17px',
      marginTop: '-5px',
      color: '#EDE7F6 !important',
      backgroundColor: '#673AB7 !important',
      verticalAlign: 'middle'
   },
});

class AddQueue extends Component {
   constructor(props) {
      super(props);
      this.state = {
         category: '',
         item: '',
         error: null,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleTFChange = this.handleTFChange.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault();
      const item = this.state.item;
      const category = this.state.category;
      const completed = false;
      const date = new Date().toISOString();
      const { user } = this.props;

      if (!item) {
         this.errorMessage('Please fill in all of the fields.')
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
            this.errorMessage(res.error.message || res.error);
         }
         else {
            this.setState({
               item: '',
               category: '',
               error: null,
            });
            this.add();
            this.errorMessage(null);
         }
      });
   }
   handleTFChange = name => event => {
      this.setState({
         [name]: event.target.value,
      });
   };

   add() {
      this.props.addItem();
   }

   errorMessage(msg) {
      this.props.errorMessage(msg);
   }

   render() {
      const { classes } = this.props;

      return (
         <div className="queue-content add-queue-content">
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
               <TextField
                  label="Entry"
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.item}
                  onChange={this.handleTFChange('item')}
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

               <div style={{ margin: 'auto' }}>
                  <Button variant="contained" className={classes.buttonAdd} onClick={this.handleSubmit}>Add</Button>
               </div>

            </form>
         </div>
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
AddQueue.propTypes = {
   classes: PropTypes.object.isRequired,
};
export default compose(
   withStyles(styles, {
      name: 'styles',
   }),
   connect(mapStateToProps),
)(AddQueue);