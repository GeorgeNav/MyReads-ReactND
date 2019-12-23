import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import Books from '../Books/Books'
import * as BooksAPI from '../../utilities/BooksAPI'
import { Route } from 'react-router-dom'
import React, { Component } from 'react'

class Search extends Component {
  state = {
    search: '',
    resultingBooks: [],
  }
  
  updateSearch(event) {
    const newSearch = event.target.value

    BooksAPI.search(newSearch)
      .then((searchResults) => {
        console.log(searchResults)
        let results = !searchResults || searchResults.error ?
          [] : Object.entries(searchResults).map(([_, book]) => book)
        this.setState((prevState) => ({
          ...prevState,
          search: newSearch,
          resultingBooks: results,
        }))
      })
  }

  render() {
    return (<Route
      exact path='/search'
      children={<Container
        style={{
          margin: '15px'
        }}>
        <InputGroup
          size='lg'>
          <Button
            href='/'>
            Back
          </Button>
          <FormControl
            aria-label='Large'
            aria-describedby='inputGroup-sizing-sm'
            placeholder='Search by title or author'
            onChange={(event) => this.updateSearch(event)} />
        </InputGroup>
        <Books
          updateShelf={this.props.updateShelf}
          category='Search Results'
          allUserBooks={this.props.allUserBooks}
          books={this.state.resultingBooks}/>
      </Container>} >
    </Route>);
  }
}
 
export default Search;