import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { getWriter } from '../redux/writerReducer'; 
import Entries from './Entries'; 

class Dashboard extends Component { 
    componentDidMount() {
        if (!this.props.writer.loggedIn) {
            this.props.getWriter(); 
        }
    }

    render() { 
        let { writer, error, redirect } = this.props; 
        if (error || redirect) return <Redirect to="/login" />; 
        if (!writer.loggedIn) return <div>Loading</div>; 
        return (
            <div className="display-container">
                <Entries />
            </div>
        ); 
    }
}

function mapStateToProps(state) {
    return state.writer; 
}

export default connect(
    mapStateToProps, 
    { getWriter }
)(Dashboard); 