import * as BooksAPI from 'utilities/BooksAPI'
import React, { Component } from 'react'
import Search from 'components/Search/Search'
import Shelf from 'components/Categories/Shelf'

class Main extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: [],
  }

  componentDidMount() {
    console.log('loading in data')
    BooksAPI.getAll().then((result) => {
      if(!result || result.error) return;

      let currentlyReading = []
      let wantToRead = []
      let read = []
      let allBooks = Object.entries(result).map(([_, book]) => {
        switch(book.shelf) {
          case 'currentlyReading':
            currentlyReading.push(book); break;
          case 'wantToRead':
            wantToRead.push(book); break;
          case 'read':
            read.push(book); break;
          default: break;
        }
        return book
      })
      
      this.setState((prevState) => ({
        ...prevState,
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,
        allBooks: allBooks,
      }))
    })
  }

  updateShelf = (prevBook) => {
    BooksAPI.get(prevBook.id)
      .then((newBook) => {
        this.setState((prevState) => {
          let currentlyReading = prevState.currentlyReading
          let wantToRead = prevState.wantToRead
          let read = prevState.read

          switch(prevBook.shelf) {
            case 'currentlyReading':
              currentlyReading = currentlyReading.filter((book) => book.id !== prevBook.id); break;
            case 'wantToRead':
              wantToRead = wantToRead.filter((book) => book.id !== prevBook.id); break;
            case 'read':
              read = read.filter((book) => book.id !== prevBook.id); break;
            default: break;
          }

          switch(newBook.shelf) {
            case 'currentlyReading':
              currentlyReading.push(newBook); break;
            case 'wantToRead':
              wantToRead.push(newBook); break;
            case 'read':
              read.push(newBook); break;
            default: break;
          }

          return {
            ...prevState,
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
          }
        })
      })
  }

  render() {
    return (<div
      className='align-items-center'>
      <Shelf
        updateShelf={this.updateShelf}
        currentlyReading={this.state.currentlyReading}
        wantToRead={this.state.wantToRead}
        read={this.state.read} />
      <Search
        updateShelf={this.updateShelf} />
    </div>)
  }
}

export default Main;