import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons"; // Import the book icon
import BooksSearch from "./BooksSearch";

const App = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <FontAwesomeIcon icon={faBook} className="me-2" /> {/* Book icon */}
            Tra cứu sách
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <BooksSearch />
      </Container>
    </div>
  );
};

export default App;
