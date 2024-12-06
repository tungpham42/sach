import React from "react";
import { Container, Navbar } from "react-bootstrap";
import BooksSearch from "./BooksSearch";

const App = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Tra cứu sách</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <BooksSearch />
      </Container>
    </div>
  );
};

export default App;
