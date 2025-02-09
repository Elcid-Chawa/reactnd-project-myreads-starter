import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selector extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array,
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
        const { book, books, currentShelf } = this.props;
        const { options } = this.state;

        let shelf = currentShelf;
        for(let b of books){
            if(book.id === b.id){
                shelf = b.shelf
                break
            }
        }

        return (
            <div className="book-shelf-changer">
                <select 
                    defaultValue={shelf}
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