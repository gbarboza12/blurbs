import React, { Component } from 'react';

class QueueItems extends Component {
   constructor(props) {
      super(props);

      this.createTasks = this.createTasks.bind(this);
   }

   delete(key) {
      this.props.delete(key);
   }
   createTasks(item) {
      return <li onClick={() => this.delete(item.key)} key={item.key}>{item.item}</li>
   }

   render() {
      var queueEntries = this.props.entries;
      var listItems = queueEntries.map(this.createTasks);

      return (
         <ul className="queueList">
            {listItems}
         </ul>
      );
   }
}

export default QueueItems;