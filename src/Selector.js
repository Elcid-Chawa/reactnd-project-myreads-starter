import React, { Component } from 'react';

class Selector extends Component {
    state = {
        optionsState: 'move'
    }

    updateQuery = (query, moveBook) => {
        this.setState(() => ({
            optionsState: query
        }));
    }

    render() {
        const { book, moveBook, shelf } = this.props;
        const { optionsState } = this.state;

        return (
            <div className="book-shelf-changer">
                <select 
                    value={optionsState} 
                    onChange={(event) =>(
                        this.updateQuery(event.target.value, moveBook(event, book, shelf))
                    )}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Selector;