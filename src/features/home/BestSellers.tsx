import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "../../app/layout/styles.css";

export default function BestSellers() {
  const { bookStore } = useStore();
  const { booksById, bookRegistry, loadBooks } = bookStore;

  useEffect(() => {
    if (bookRegistry.size <= 1) loadBooks();
  }, [bookRegistry.size, loadBooks]);

  return (
    <>
      <h2>
        <span>Best Sellers</span>
      </h2>
      <Card.Group divided itemsPerRow={"4"} className="BestSellers">
        {booksById.map((book) => (
          <Card key={book.bookId}>
            <img
              src={
                `/images/books/${book.bookName}.jpg` ||
                `/images/books/${book.bookName}.png`
              }
            />
            <p id="productName">{book.bookName}</p>
            <p id="author">{book.author}</p>
            <p id="textDesc">{book.bookDescription}</p>
            <div className="cardBtn">
              <p id="price">{book.price}€</p>
              <Button floated="right" content="Add to Cart" color="blue" />
            </div>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
