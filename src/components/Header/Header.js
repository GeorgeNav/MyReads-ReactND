import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

class Header extends Component {
  state = {}
  render() {
    return (<Container fluid>
      <Row
        style={{
          backgroundColor: 'green',
          padding: '8px',
        }}
        className='justify-content-center'>
        <h2
          style={{
            color: 'white',
          }}>
          MyReads
        </h2>
      </Row>
    </Container>);
  }
}

export default Header;