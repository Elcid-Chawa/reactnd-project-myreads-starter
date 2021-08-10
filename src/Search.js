import React, { Component } from "react"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import Selector from "./Selector";


class Search extends Component {

    state = {
        query: '',
        searched: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))

        if(query){
          BooksAPI.search(query.trim(), 20)
          .then(books => {
            books.length > 0 
              ? this.setState(() => ({
                  searched: [...books]
                }))
              : this.setState(() => ({
                searched: []
              }))
          });
        }
    }

    render(){

        const { query, searched } = this.state;
        const { moveBook } = this.props;

        const showingBooks = query === '' 
            ?  []
            : searched.filter((b) => typeof(b.imageLinks) !== 'undefined' )

        let currentShelf = 'none';

        return(
            <div className="search-books">
              <div className="search-books-bar">
                  <Link to="/"><button className="close-search">Close</button></Link>              
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />

                    

                  </div>
              </div>
              
              {showingBooks.length !== searched.length && (
                  <div className="showing-books">
                    {((showingBooks.length === 0) && (query !== '') && (
                        <div className="invalid-query">invalid query.</div>)
                      )}
                    <span>Now showing {showingBooks.length} of {searched.length} books</span>
                  </div>
                )}

                {showingBooks.length === searched.length && (
                  <div className="showing-books">
                    <span>Now all {showingBooks.length} of {searched.length} books</span>
                  </div>
                )}

              <div className="search-books-results">

                <ol className="books-grid">
                    { showingBooks.map( (book) => book.shelf === undefined || 'none' 
                        ? (
                        
                              <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <Selector book={book} books={showingBooks} moveBook={moveBook} currentShelf={currentShelf} />
                                            </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            
                          ) : (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <Selector book={book} books={showingBooks} moveBook={moveBook} currentShelf={book.shelf} />
                                            </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                              ) 
                      )
                        
                    }
                </ol>

              </div>

          </div>
        )
    }

}

Search.propTypes = {
  moveBook: PropTypes.func.isRequired
}

export default Search;