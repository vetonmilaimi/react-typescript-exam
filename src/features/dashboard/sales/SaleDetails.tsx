import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function SaleDetails() {
  const { saleStore } = useStore();
  const {
    selectedSale: sale,
    loadSale,
    loadingInitial,
  } = saleStore;
  const { saleId } = useParams<{ saleId: string }>();

  useEffect(() => {
    if (saleId) loadSale(saleId);
  }, [saleId, loadSale]);

  if (loadingInitial || !sale) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{sale.saleId}</Card.Header>
          <Card.Description>Sale Note: {sale.saleNote}</Card.Description>
          <Card.Description>Book Id: {sale.bookId}</Card.Description>
          <Card.Description>Staff Id: {sale.staffId}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/sales/${sale.saleId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/sales'
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
