import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row} from 'reactstrap';
import { VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'whatwg-fetch';

import Events from './events';
import { authHeader } from '../helpers/authheader';

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
        const { user } = this.props;
        
        fetch(`/api/blurbs/${user._id}`, {
            method: 'GET', 
            headers: {'Authorization' : authHeader()}
        }).then(data => data.json())
          .then((res) => {
            if (!res.success) {this.setState({ error: res.error }); console.log(this.state.error)}
            else {this.setState({ data: res.data }); }
          });
    }

    render() {
        return (
            <Container>
                <Row>
                    <VerticalTimeline animate={false} >
                        <Events data={this.state.data} />
                    </VerticalTimeline>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps)(Timeline);
