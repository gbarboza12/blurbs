import React, { Component } from "react";
import { Link } from "react-router-dom";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import * as FontAwesome from "react-fontawesome";
import moment from "moment";
import ShowMoreText from "react-show-more-text";

class Events extends Component {
  getIcon(category) {
    if (category === "Film") {
      return (
        <div className="timeline-icon">
          <FontAwesome name="film fa-2x" />
        </div>
      );
    } else if (category === "Television") {
      return (
        <div className="timeline-icon">
          <FontAwesome name="tv fa-2x" />
        </div>
      );
    } else if (category === "Books") {
      return (
        <div className="timeline-icon">
          <FontAwesome name="book fa-2x" />
        </div>
      );
    } else if (category === "Music") {
      return (
        <div className="timeline-icon">
          <FontAwesome name="headphones fa-2x" />
        </div>
      );
    } else {
      return (
        <div className="timeline-icon">
          <FontAwesome name="star fa-2x" />
        </div>
      );
    }
  }
  getIconBackground(category) {
    if (category === "Film") {
      return "#ff70a6";
    } else if (category === "Television") {
      return "#ff9770";
    } else if (category === "Book") {
      return "#ffd670";
    } else if (category === "Music") {
      return "#8670ff";
    } else {
      return "#70d6ff";
    }
  }
  getFormattedDate(date) {
    var localDate = moment(date).format("dddd, MMMM Do YYYY");
    return localDate;
  }

  render() {
    if (this.props.data.length === 0) {
      return (
        <VerticalTimelineElement className="vertical-timeline-element">
          <h3 className="vertical-timeline-element-title">
            No entries added yet!
          </h3>
          <p>
            <Link to="/addBlurb"> Click here to add one.</Link>
          </p>
        </VerticalTimelineElement>
      );
    } else {
      let list = this.props.data.map(event => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element"
            date={this.getFormattedDate(event.date)}
            iconStyle={{
              background: this.getIconBackground(event.category),
              color: "#fff",
              textAlign: "center"
            }}
            icon={this.getIcon(event.category)}
            key={event._id}
          >
            <h4 className="vertical-timeline-element-title">
              {event.name}
            </h4>
            <h6 className="vertical-timeline-element-subtitle">{event.category}</h6>
            <ShowMoreText
              lines={10}
              more="Show more"
              less="Show less"
              anchorClass=""
              onClick={this.executeOnClick}
            >
              {event.content}
            </ShowMoreText>
            <p>
              <Link
                to={{
                  pathname: "/editBlurb",
                  state: {
                    id: event._id,
                    date: event.date,
                    category: event.category,
                    name: event.name,
                    content: event.content
                  }
                }}
              >
                Edit
              </Link>
              &nbsp;&nbsp;
            </p>
          </VerticalTimelineElement>
        );
      });
      return list;
    }
  }
}

Events.defaultProps = {
  data: []
};

export default Events;
