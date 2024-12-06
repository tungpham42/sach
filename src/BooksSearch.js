import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Pagination,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import "./BooksSearch.css";

const BooksSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [noResults, setNoResults] = useState(false); // To track if no books are found
  const booksPerPage = 12;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNoResults(false); // Reset no-results notification
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const results = response.data.docs;
      if (results.length === 0) {
        setNoResults(true);
      }
      setBooks(results);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCoverImage = (coverId) =>
    coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://placehold.co/356x200?text=No+Cover";

  const handleShow = (book) => {
    setSelectedBook(book);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedBook(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Tìm sách theo từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* No results notification */}
      {noResults && (
        <Alert variant="warning" className="text-center">
          Không tìm thấy sách nào. Hãy thử từ khóa khác!
        </Alert>
      )}

      <Row className="equal-height-cards">
        {currentBooks.map((book, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={getCoverImage(book.cover_i)}
                alt={book.title}
                className="book-cover"
              />
              <Card.Body>
                <Card.Title>
                  {book.title} ({book.first_publish_year || "N/A"})
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Không rõ tác giả"}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  onClick={() => handleShow(book)}
                  className="btn-sm"
                >
                  Xem tóm tắt
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {books.length > booksPerPage && (
        <Pagination className="justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      {/* Modal for book details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Tác giả:</strong>{" "}
            {selectedBook?.author_name?.join(", ") || "Không rõ"}
          </p>
          <p>
            <strong>Năm xuất bản:</strong>{" "}
            {selectedBook?.first_publish_year || "N/A"}
          </p>
          <p>
            <strong>Chủ đề:</strong>{" "}
            {selectedBook?.subject?.join(", ") || "N/A"}
          </p>
          <Button
            variant="primary"
            className="btn-sm"
            onClick={() =>
              window.open(
                `https://openlibrary.org${selectedBook?.key}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Chi tiết
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BooksSearch;
