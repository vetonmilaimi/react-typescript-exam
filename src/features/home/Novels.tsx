import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "../../app/layout/styles.css";

export default function BestSellers() {

    const { novelStore } = useStore();
    const { novelsById, novelRegistry, loadNovels } = novelStore;
    
    useEffect(() => {
      if (novelRegistry.size <= 1) loadNovels();
    }, [novelRegistry.size, loadNovels]);

  return (
    <>
      <h2>
        <span>Novels</span>
      </h2>
      <Card.Group divided itemsPerRow={"4"} className="BestSellers" >
        {novelsById.map((novel) => (
          <Card key={novel.novelId}>
            <img src={`/images/books/${novel.novelName}.jpg`||`/images/books/${novel.novelName}.png`}/>
            <p id="productName">{novel.novelName}</p>
            <p id="author">{novel.novelist}</p>
            <div className="cardBtn">
              <p id="price">{novel.price}€</p>
              <Button floated="right" content="Add to Cart" color="blue" />
            </div>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}
