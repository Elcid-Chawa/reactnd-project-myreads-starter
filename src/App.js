import React from 'react'
import { Link, Route } from 'react-router-dom'
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


  filterShelf = (book) => {

    if(this.state.currentlyReading.includes(book)){
      this.setState((currentState) => ({
        currentlyReading: currentState.currentlyReading.filter((b) => {
          return b.id !== book.id
        })
      }))
    }

    if(this.state.wantToRead.includes(book)){
      this.setState((currentState) => ({
        wantToRead: currentState.wantToRead.filter((b) => {
          return b.id !== book.id
        })
      }))
    }

    if(this.state.readBooks.includes(book)){
      this.setState((currentState) => ({
        readBooks: currentState.readBooks.filter((b) => {
          return b.id !== book.id
        })
      }))
    }
  }

  
  moveBook = (event, book, shelf) => {

    
    if(event.target.value === "currentlyReading"){
      
      if((shelf !== event.target.value ) && !this.state.currentlyReading.includes(book)){
        this.filterShelf(book)
        this.setState((previousState) => ({
          currentlyReading: [...previousState.currentlyReading, book]
        }))  
      } 

      BooksAPI.update(book, event.target.value);

    }

    if(event.target.value === "wantToRead"){
      
      if((shelf !== event.target.value ) && !this.state.wantToRead.includes(book)){
        this.filterShelf(book)
        this.setState((previousState) => ({
          wantToRead: [...previousState.wantToRead, book]
        }))  
      } 
      BooksAPI.update(book, event.target.value);

    }
    
    if(event.target.value === "read" ){
      if((shelf !== event.target.value) && !this.state.readBooks.includes(book)){
        this.filterShelf(book)
        this.setState((previousState) => ({
          readBooks: [...previousState.readBooks, book]
        }))
        console.log(" Move to Read Shelf")
      }

      BooksAPI.update(book, event.target.value);

    }

    if(event.target.value === "none"){
      this.filterShelf(book);
    }

  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div>
            <Search 
              allBooks={ this.state.allBooks } 
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
        
      </div>
    )
  }
}

export default BooksApp
