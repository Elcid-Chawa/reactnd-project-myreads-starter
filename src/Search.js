import React, { Component } from "react"
import { Link } from "react-router-dom";
import Book from "./Books";
import PropTypes from 'prop-types';


class Search extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    render(){

        const { query } = this.state;
        const { allBooks, moveBook } = this.props;

        const showingBooks = query === '' 
            ?  []
            : allBooks.filter((b) => (
                b.title.toLowerCase().includes(query.toLowerCase())
            ))

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
              
              {showingBooks.length !== allBooks.length && (
                  <div className="showing-books">
                    {((showingBooks.length === 0) && (query !== '') && (
                        <div className="invalid-query">invalid query.</div>)
                      )}
                    <span>Now showing {showingBooks.length} of {allBooks.length} books</span>
                  </div>
                )}

                {showingBooks.length === allBooks.length && (
                  <div className="showing-books">
                    <span>Now all {showingBooks.length} of {allBooks.length} books</span>
                  </div>
                )}

              <div className="search-books-results">
                <ol className="books-grid"></ol>
                <Book books={showingBooks} moveBook={moveBook} shelf="none"/>
              </div>

          </div>
        )
    }

}

Search.propTypes = {
  allBooks: PropTypes.array,
  moveBook: PropTypes.func
}

export default Search;