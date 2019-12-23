import { Col, Button } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import React, { Component } from 'react';
import Books from 'components/Books/Books'

class Shelf extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.allBooks !== prevProps.allBooks ||
       this.props.currentlyReading !== prevProps.currentlyReading ||
       this.props.wantToRead !== prevProps.wantToRead ||
       this.props.read !== prevProps.read) {
      this.setState({
        ...prevState,
        currentlyReading: this.props.currentlyReading,
        wantToRead: this.props.wantToRead,
        read: this.props.read,
      })
    }
  }

  render() {
    return (<Route
      exact path='/'>
      <Col>
        <Books
          updateShelf={this.props.updateShelf}
          category='Currently Reading'
          books={this.state.currentlyReading} />
        <Books
          updateShelf={this.props.updateShelf}
          category='Want to Read'
          books={this.state.wantToRead} />
        <Books
          updateShelf={this.props.updateShelf}
          category='Read'
          books={this.state.read} />
        <Button
          style={{
            margin: '8px'
          }}
          href='/search'>
          Search
        </Button>
      </Col>
    </Route>);
  }
}
 
export default Shelf;