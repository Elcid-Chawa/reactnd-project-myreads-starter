import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selector extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired,
    };

    state = {
        optionsState: 'none',
        options: [
            {"id": "move", "value": "Move to...", },
            {"id": "currentlyReading", "value":  "Currently Reading"},
            {"id": "wantToRead", "value":  "Want to Read"},
            {"id": "read", "value": "Read"},
            {"id": "none", "value": "None"}
        ]
    };

    updateQuery = (changeShelf, book) => {
        
        this.props.moveBook(changeShelf, book);
        this.setState(() => ({
            optionsState: changeShelf
        }))
    }

    render() {
        const { book, books } = this.props;
        const { optionsState, options } = this.state;

        // set current shelf to none as default
        let currentShelf = 'none';

        // if book is in current list, set current shelf to book.shelf
        for (let b of books) {
            if (b.id === book.id) {
                currentShelf = b.shelf;
                break;
            }
        }

        return (
            <div className="book-shelf-changer">
                <select 
                    defaultValue={currentShelf}
                    onChange={(event) => this.updateQuery(event.target.value, book)}                    
                >
                    {options.map( (opt, index) => (
                            opt.id === "move" ? (<option value={opt.id} key={index} disabled>{opt.value}</option>)
                            : (<option value={opt.id} key={index} >{opt.value}</option>)
                        )
                    )}
                </select>
            </div>
        )
    }
}

export default Selector;