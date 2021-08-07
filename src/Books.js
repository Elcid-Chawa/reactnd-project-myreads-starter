import React, { Component } from 'react';
import Selector from './Selector';

class Book extends Component {
    render(){
        const { books, moveBook, shelf } = this.props;
        return (
            <ol className="books-grid">
                { books.map( (book) => ( 
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <Selector book={book} moveBook={moveBook} shelf={shelf} />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors[0]}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default Book;