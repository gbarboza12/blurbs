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
      this.props.complete(key, current);
   }
   createTasks(item) {
      if (item.completed) {
         return (
            <div key={item.key} className="row-queue">
               <div className="col-8 ">
                  <div className="pretty p-icon p-rotate p-curve" onClick={() => this.complete(item.key, item.completed)}>
                     <input type="checkbox" />
                     <div className="state p-info">
                        <i className="icon fa fa-check"></i>
                        <label className="radio-label-complete">{item.item}</label>
                     </div>
                  </div>
               </div>
               <div className="col-4 text-center"><i className="far fa-trash-alt delete-icon" onClick={() => this.delete(item.key)}></i></div>
            </div>

         );
      } else {
         return (
            <div key={item.key} className="row-queue">
               <div className="col-8 ">
                  <div className="pretty p-icon p-rotate p-curve" onClick={() => this.complete(item.key, item.completed)}>
                     <input type="checkbox" />
                     <div className="state p-info">
                        <i className="icon fa fa-check"></i>
                        <label>{item.item}</label>
                     </div>
                  </div>
               </div>
               <div className="col-4 text-center"><i className="far fa-trash-alt delete-icon" onClick={() => this.delete(item.key)}></i></div>
            </div>
         );
      }
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