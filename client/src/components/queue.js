import React, { Component } from 'react';
import { Container, Row, Input, } from 'mdbreact';
import { Alert, } from 'reactstrap';

import QueueItems from './queueitems';

class Queue extends Component {
   constructor(props) {
      super(props);
      this.state = {
         category: '',
         item: '',
         completed: '',
         items: [],
         error: null,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault();
      console.log('submit')
		const item = this.state.item;

		if (!item) {
			this.setState({
				error: 'Please fill in all of the fields.'
			})
			return;
      }
      var newItem = {
         item: this.state.item,
         key: Date.now()
      }
		this.setState({ 
         item: '', 
         error: null, 
         items: [...this.state.items, newItem]
      });
		
	}
	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
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

   render() {
      return (
         <Container>
				<Row >
					<div className="content">
               {this.state.error && <Alert color="danger">Error: {this.state.error}</Alert>}
						<form onSubmit={this.handleSubmit}>
							<Input 
								label="Title" 
								group
								type="text" 
								name="item" 
								value={this.state.item}
								onChange={this.handleInputChange} 
								/>

							<div className="button-div">
								<button className="btn btn-outline-secondary waves-effect">Submit</button>
							</div>
						</form>
					</div>
				</Row>
            <Row>
               <QueueItems entries={this.state.items} delete={this.deleteItem}/>
            </Row>
			</Container>
      )
   }
}

export default Queue