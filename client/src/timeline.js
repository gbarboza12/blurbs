import React, { Component } from 'react';
import { Container, Row} from 'reactstrap';
import { VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AddNew from './addnew';
import Events from './events';
import 'whatwg-fetch';

class Timeline extends Component {
    constructor() {
        super();
        this.state = { 
            data: [],
            error: null,
        };
        this.pollInterval = null;
    }

    componentDidMount() {
        this.loadBlurbsFromServer();
        if (!this.pollInterval) {
          this.pollInterval = setInterval(this.loadBlurbsFromServer, 5000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    loadBlurbsFromServer = () => {
        fetch('/api/blurbs/')
          .then(data => data.json())
          .then((res) => {
            if (!res.success) this.setState({ error: res.error });
            else this.setState({ data: res.data });
          });
    }

    render() {
        return (
            <Container>
                <Row>
                    <AddNew />
                </Row>
                <Row>
                    <VerticalTimeline animate={false} >
                        <Events data={this.state.data} />
                    </VerticalTimeline>
                </Row>
                {this.state.error && <p>{this.state.error}</p>}
            </Container>
        )
    }
}
export default Timeline;
