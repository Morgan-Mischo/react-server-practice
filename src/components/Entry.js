import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEntry, editEntry } from '../redux/entriesReducer';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: props.title,
      newContent: props.content,
      editing: false
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  flipEdit = () => this.setState({ editing: !this.state.editing });

  save = () => {
    let { id, editEntry } = this.props;
    let { newTitle, newContent } = this.state;
    editEntry(id, newTitle, newContent);
  };

  delete = () => {
    let { id, deleteEntry } = this.props;
    deleteEntry(id);
  };

  componentDidUpdate(prevProps) {
    let { title, content } = prevProps;
    if (title !== this.props.title || content !== this.props.content) {
      this.setState({
        newTitle: title,
        newContent: content,
        editing: false
      });
    }
  }

  render() {
    let { title, content } = this.props;
    let { newTitle, newContent, editing } = this.state;

    return (
      <div className="entry-container">
        {editing ? (
          <div>
            <input
              value={newTitle}
              onChange={this.handleChange}
              name="newTitle"
              className="input full-width"
            />
            <textarea
              value={newContent}
              type="text"
              onChange={this.handleChange}
              name="newContent"
              className="input full-width"
            />
            <div>
              <button onClick={this.save} className="btn normal-btn">
                Save
              </button>
              <button onClick={this.flipEdit} className="btn warning-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h4>{title}</h4>
            <p>{content}</p>
            <div>
              <button onClick={this.flipEdit} className="btn normal-btn">
                Edit
              </button>
              <button onClick={this.delete} className="btn warning-btn">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEntry, editEntry }
)(Entry);