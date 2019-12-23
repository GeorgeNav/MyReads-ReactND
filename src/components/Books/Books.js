import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Book from './Book/Book';

class Books extends Component {
  state = {
    books: []
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.books !== prevProps.books) {
      this.setState({
        ...prevState,
        books: this.props.books
      })
    }
  }

  render() {
    return (<div>
      <h2
        style={{
          textAlign: 'center',
          textJustify: 'center',
        }}>
        {this.props.category}
      </h2>
      <Row>
        {this.state.books.map((book) =>
          (<Book
            updateShelf={this.props.updateShelf}
            key={book.id}
            book={book}
            allUserBooks={this.props.allUserBooks} />)
        )}
      </Row>
    </div>);
  }
}
 
export default Books;