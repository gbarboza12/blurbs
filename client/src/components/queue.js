import React, { Component } from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Alert, } from 'reactstrap';

import QueueItems from './queueitems';

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

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.completeItem = this.completeItem.bind(this);
      this.addItem = this.addItem.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault();
      const item = this.state.item;

      if (!item) {
         this.setState({
            error: 'Please fill in all of the fields.'
         })
         return;
      }
      var newItem = {
         key: Date.now(),
         item: this.state.item,
         category: this.state.category,
         completed: false,
      }
      this.setState({
         item: '',
         category: '',
         error: null,
         items: [...this.state.items, newItem],
         addNew: false,
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
   deleteItem(key) {
      var filteredItems = this.state.items.filter(function (item) {
         return (item.key !== key);
      });

      this.setState({
         items: filteredItems
      });
   }
   completeItem(key, current) {
      this.setState({
         ...this.state,
         items: this.state.items.map(item => item.key === key ?
            { ...item, completed: !current } : item
         )
      })
   }
   addItem() {
      this.setState({ addNew: true })
   }

   render() {
      return (
         <Container>
            <div className="headings"><h3>Queue</h3></div>
            {this.state.error ?
               <Alert color="danger">Error: {this.state.error}</Alert>
               : null}
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
            <div className="row-add">
               <a href="#" className="float" onClick={this.addItem}>
                  <i className="fa fa-plus my-float"></i>
               </a>
            </div>
         </Container>
      )
   }
}

export default Queue