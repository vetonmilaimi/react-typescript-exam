import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function StockList() {
  const { stockStore } = useStore();
  const { deleteStock, stocksById, loading } = stockStore;
  const [target, setTarget] = useState("");

  function handleStockDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    stockId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteStock(stockId);
  }

  return (
    <>
      <h1>Stock</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/stocks/createStock"
            positive
            content="Create Stock"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {stocksById.map((stock) => (
            <Item key={stock.stockId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {stock.stockId}
                </Item.Header>
                <Item.Description>
                  <div>Book ID: {stock.bookId}</div>
                </Item.Description>
                <Item.Description>
                  <div>Amount: {stock.amount}</div>
                </Item.Description>

                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/stocks/${stock.stockId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={stock.stockId}
                    loading={loading && target === stock.stockId}
                    onClick={(e) => handleStockDelete(e, stock.stockId)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
