import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SaleList() {
  const { saleStore } = useStore();
  const { deleteSale, salesById, loading } = saleStore;
  const [target, setTarget] = useState("");

  function handleSaleDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    saleId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteSale(saleId);
  }

  return (
    <>
      <h1>Sale</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/sales/createSale"
            positive
            content="Create Sale"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {salesById.map((sale) => (
            <Item key={sale.saleId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {sale.saleId}
                </Item.Header>
                <Item.Header as="a">{sale.saleId}</Item.Header>
                <Item.Description>
                  <div>Sale Note: {sale.saleNote}</div>
                  <div>Book Id: {sale.bookId}</div>
                  <div>Staff Id: {sale.staffId}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/sales/${sale.saleId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={sale.saleId}
                    loading={loading && target === sale.saleId}
                    onClick={(e) =>
                      handleSaleDelete(e, sale.saleId)
                    }
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
