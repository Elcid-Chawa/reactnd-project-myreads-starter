import React, { Component } from 'react';
import Book from './Books';

class AllBooks extends Component {


    render () {

      const { currentlyReading, wantToRead, readBooks, moveBook } = this.props;

        return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          <div className="list-books-content">
            <div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <Book books={currentlyReading} moveBook={moveBook} shelf="currentlyReading" />
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <Book books={wantToRead} moveBook={moveBook} shelf="wantToRead" />
                </div>
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <Book books={readBooks}  moveBook={moveBook} shelf="read" />
                </div>
              </div>

            </div>
          </div>

        </div>
        )
    }

}

export default AllBooks;