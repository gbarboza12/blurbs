import React, { Component } from 'react';
import './css/queue.css';


class QueueItems extends Component {
   constructor(props) {
      super(props);

      this.createTasks = this.createTasks.bind(this);
   }

   delete(key) {
      this.props.delete(key);
   }
   complete(key, current) {
      console.log("complete called")
      this.props.complete(key, current);
   }
   createTasks(item) {
      if (item.completed) {
         console.log('item complete')
         return (
            <li key={item.key} className="pretty p-icon p-rotate p-curve" onClick={() => this.complete(item.key, item.completed)}>
               <input type="checkbox" />
               <div class="state p-info">
                  <i class="icon fa fa-check"></i>
                  <label className="radio-label-complete">{item.item}</label>
               </div>
            </li>

         );
      } else {
         console.log('item not complete')
         return (
            <li key={item.key} className="pretty p-icon p-rotate p-curve" onClick={() => this.complete(item.key, item.completed)}>
               <input type="checkbox" />
               <div class="state p-info">
                  <i class="icon fa fa-check"></i>
                  <label>{item.item}</label>
               </div>
            </li>

         );
      }
   }

   render() {
      var queueEntries = this.props.entries;
      var listItems = queueEntries.map(this.createTasks);
      console.log('rendering')
      return (
         <ul className="queueList">
            {listItems}
         </ul>
      );
   }
}

export default QueueItems;