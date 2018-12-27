import React, { Component } from 'react';
import { Container } from 'reactstrap'
import Title from './components/Title';
import Todos from './components/Todos';

class App extends Component {
  render() {
    return (
      <Container>
        <Title />
        <Todos />
      </Container>
    );
  }
}

export default App;
