import React, { Component } from 'react';
import './css/queue.css';
import * as FontAwesome from 'react-fontawesome';


class QueueItems extends Component {
   constructor(props) {
      super(props);

      this.createTasks = this.createTasks.bind(this);
      this.getIcon = this.getIcon.bind(this);
   }

   delete(key) {
      this.props.delete(key);
   }
   complete(key, current) {
      this.props.complete(key, current);
   }
   getIcon(category) {
      if(category === 'Film') {
          return <FontAwesome name="film" style={{color:this.getIconColor(category)}}/>;
      } else if(category === 'Television') {
          return <FontAwesome name="tv" style={{color:this.getIconColor(category)}}/>;
      } else if(category === 'Book') {
          return <FontAwesome name="book" style={{color:this.getIconColor(category)}}/>;
      } else if(category === 'Music') {
          return <FontAwesome name="headphones" style={{color:this.getIconColor(category)}}/>;
      } else {
          return <FontAwesome name="star" style={{color:this.getIconColor(category)}}/>;
      }
  }
  getIconColor(category) {
   if(category === 'Film') {
       return '#ff70a6';
   } else if(category === 'Television') {
       return '#ff9770';
   } else if(category === 'Book') {
       return '#ffd670';
   } else if(category === 'Music') {
       return '#8670ff';
   } else {
       return '#70d6ff';
   }
}
   createTasks(item) {
      return (
         <div key={item.key} className="row-queue">
            <div className="col-8">
               <div className="pretty p-icon p-curve p-thick p-rotate" onClick={() => this.complete(item.key, item.completed)}>
                  <input type="checkbox" />
                  <div className="state p-info">
                     <i className="icon fa fa-check"></i>
                     {item.completed ?
                        <label className="radio-label-complete">{item.item}</label>
                        : <label >{item.item}</label>}
                  </div>
               </div>
               <div className="queue-category">
                  {this.getIcon(item.category)}{'  '}
                  {item.category}
               </div>
            </div>
            <div className="col-4 text-center"><i className="far fa-trash-alt delete-icon" onClick={() => this.delete(item.key)}></i></div>
         </div>

      );
   }

   render() {
      var queueEntries = this.props.entries;
      var listItems = queueEntries.map(this.createTasks);
      console.log('rendering')
      return (
         <div className="queue-content">
            {listItems}
         </div>

      );
   }
}

export default QueueItems;