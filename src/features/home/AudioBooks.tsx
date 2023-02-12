import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "../../app/layout/styles.css";

export default function AudioBooks() {

    const { audioBookStore } = useStore();
    const { audioBooksById, audioBookRegistry, loadAudioBooks } = audioBookStore;
    
    useEffect(() => {
      if (audioBookRegistry.size <= 1) loadAudioBooks();
    }, [audioBookRegistry.size, loadAudioBooks]);

  return (
    <>
      <h2>
        <span>Audio Books</span>
      </h2>
      <Card.Group divided itemsPerRow={"4"} className="BestSellers" >
        {audioBooksById.map((audioBook) => (
          <Card key={audioBook.audioBookId}>
            <img src={`/images/books/${audioBook.audioBookName}.jpg`||`/images/books/${audioBook.audioBookName}.png`}/>
            <p id="productName">{audioBook.audioBookName}</p>
            <p id="productName">{audioBook.length} minutes</p>
            <div className="cardBtn">
              <p id="price">{audioBook.price}€</p>
              <Button floated="right" content="Listen Now" color="blue" />
            </div>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
