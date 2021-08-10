import React from 'react';
import Selector from './Selector';
import PropTypes from 'prop-types';

function Book (props){

    return (
        <ol className="books-grid">
            { props.books.map( (book) => (
                 
                       <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                        <Selector book={book} books={props.books} moveBook={props.moveBook} currentShelf={props.currentShelf} />
                                    </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    
                ))
            }
        </ol>
    );
}

Book.propTypes = {
    books: PropTypes.array.isRequired,
    currentShelf: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Book;