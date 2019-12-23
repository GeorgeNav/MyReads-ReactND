import React, { Component } from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import * as BooksAPI from 'utilities/BooksAPI'

class Book extends Component {
  handleShelfAction(book, newShelf) {
    BooksAPI.update(this.props.book, newShelf)
      .then(() => {
        this.props.updateShelf(book)
      })
  }

  render() { 
    const { id, title, imageLinks, authors, shelf } = this.props.book
    return (<Card
      key={id}
      className='mx-auto'
      style={{
        padding: '15px',
        margin: '15px',
        width: '250px',
      }}>
      {imageLinks && (<Card.Img
        variant='top'
        style={{
          height: '300px',
          padding: '0 0 15px 0',
          objectFit: 'cover',
        }}
        src={`${imageLinks.thumbnail} cap`} />)}
      <Card.Title >{title}</Card.Title>
      <Card.Text >{authors ? authors['0'] : ''}</Card.Text>
      <DropdownButton
        title='Category'
        variant='outline-primary'
        className='text-center' >
        <Dropdown.Header>
          Select Book Placement
        </Dropdown.Header>
        <Dropdown.Item
          onSelect={() => this.handleShelfAction(this.props.book, 'currentlyReading')}
          disabled={shelf === 'currentlyReading'} >
          Currently Reading List
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() => this.handleShelfAction(this.props.book, 'wantToRead')}
          disabled={shelf === 'wantToRead'} >
          Want to Read List
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() => this.handleShelfAction(this.props.book, 'read')}
          disabled={shelf === 'read'} >
          Read List
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() => this.handleShelfAction(this.props.book, 'none')}
          disabled={
            shelf !== 'currentlyReading' &&
            shelf !== 'wantToRead' &&
            shelf !== 'read'
          } >
          None
        </Dropdown.Item>
      </DropdownButton>
    </Card>);
  }
}
 
export default Book;