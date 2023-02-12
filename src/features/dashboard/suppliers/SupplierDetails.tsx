import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function SupplierDetails() {
  const { supplierStore } = useStore();
  const {
    selectedSupplier: supplier,
    loadSupplier,
    loadingInitial,
  } = supplierStore;
  const { supplierId } = useParams<{ supplierId: string }>();

  useEffect(() => {
    if (supplierId) loadSupplier(supplierId);
  }, [supplierId, loadSupplier]);

  if (loadingInitial || !supplier) return <LoadingComponent />;

  return (
    <>
    <DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{supplier.supplierId }     {supplier.supplierName}</Card.Header>
          <Card.Description>Address: {supplier.supplierAddress}</Card.Description>
          <Card.Description>Phone: {supplier.phone}</Card.Description>
         
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/supplier/${supplier.supplierId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/suppliers'
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
