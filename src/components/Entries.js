import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries, saveEntry } from '../redux/entriesReducer'; 
import Entry from './Entry';

class Entries extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: ''
    };
  }

  componentDidMount() {
    let { getEntries, entries, writerId } = this.props;
    if (!entries.length) {
      getEntries(writerId);
    }
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addEntry = () => {
    let { title, content } = this.state;
    this.setState({ title: '', content: '' });
    this.props.saveEntry(title, content);
  };

  render() {
    let { title, content } = this.state;
    let { entries } = this.props;
    return (
      <div>
        {entries.map(entry => (
          <Entry key={entry.id} {...entry} />
        ))}
        <div>
          <input
            type="text"
            value={title}
            name="title"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={content}
            name="content"
            onChange={this.handleChange}
          />
          <button onClick={this.addEntry}>Add Entry</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.user.id,
    ...state.entries
  };
}

export default connect(
  mapStateToProps,
  { getEntries, saveEntry }
)(Entries);