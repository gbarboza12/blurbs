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
         items: [],
         error: null,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.completeItem = this.completeItem.bind(this);
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
         completed: false,
      }
		this.setState({ 
         item: '', 
         error: null, 
         items: [...this.state.items, newItem]
      });
		
	}
	handleInputChange(e) {
      console.log("input change")
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
   completeItem(key, current) {
      this.setState({
         ...this.state,
         items: this.state.items.map(item => item.key === key ?
            {...item, completed: !current} : item
         )
      })
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

							{/* <div className="button-div">
								<button className="btn btn-outline-secondary waves-effect">Submit</button>
							</div> */}
						</form>
					</div>
				</Row>
            <Row>
               <QueueItems entries={this.state.items} delete={this.deleteItem} complete={this.completeItem}/>
            </Row>
			</Container>
      )
   }
}

export default Queue