import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
// import Book from './Books'
import AllBooks from './AllBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    readBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          allBooks: allBooks,
          currentlyReading: allBooks.filter((b) => (b.shelf === "currentlyReading")),
          wantToRead: allBooks.filter((b) => (b.shelf === "wantToRead")),
          readBooks: allBooks.filter((b) => (b.shelf === "read"))
        }))
      });

  }


  filterShelf = (res, book, prevShelf, shelfState) => {

    if (res.includes(book.id) && (prevShelf === book.shelf)){
      return shelfState
    }
    if(res.includes(book.id) && (prevShelf !== book.shelf)){
     
      return shelfState.filter(b => {return b.id !== book.id}).concat(book)
    }
    
    return shelfState.filter(b => {return b.id !== book.id})
  }

  
  moveBook = (changeShelf, book) => {
    
    // this.filterShelf(book)
    BooksAPI.update(book, changeShelf)
      .then(res => {
        const prevShelf = book.shelf;
        book.shelf = changeShelf;

        this.setState((currentState) => ({
          currentlyReading: this.filterShelf(res.currentlyReading, book, prevShelf, currentState.currentlyReading),
          wantToRead: this.filterShelf(res.wantToRead, book, prevShelf, currentState.wantToRead),
          readBooks: this.filterShelf(res.read, book, prevShelf, currentState.readBooks)
        }))

        console.log(`Book moved to ${changeShelf}`)
      })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render={() => (
            <div>
              <Search 
                moveBook={this.moveBook} 
              />
            </div>
            
          )} />
          <Route exact path='/' render ={() => (
            <div className="list-books">
              <AllBooks 
                allBooks={this.state.allBooks}
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                readBooks={this.state.readBooks}
                moveBook={this.moveBook}
              />
              <div className="open-search">
                <Link to="/search"><button >Add a book</button></Link>
              </div>
            </div>
          )}  />
          <Route render={() => (
            <div>   Page Not Found
              <br />
              <span> 
                <Link to="/"><button className="close-err">Go back Home</button></Link>
              </span> 
            </div>
          )}/>
      </Switch>  
      </div>
    )
  }
}

export default BooksApp
