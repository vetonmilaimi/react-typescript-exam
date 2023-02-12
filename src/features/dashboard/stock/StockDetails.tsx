import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function StockDetails() {
  const { stockStore } = useStore();
  const {
    selectedStock: stock,
    loadStock,
    loadingInitial,
  } = stockStore;
  const { stockId: stockId } = useParams<{ stockId: string }>();

  useEffect(() => {
    if (stockId) loadStock(stockId);
  }, [stockId, loadStock]);

  if (loadingInitial || !stock) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{stock.stockId}</Card.Header>
          <Card.Description>Book ID: {stock.bookId}</Card.Description>
          <Card.Description>Amount {stock.amount}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/stock/${stock.stockId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/stocks'
              basic
              color="red"
            >
              Cancel
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
    </>
  );
});
