import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SupplierList() {
  const { supplierStore } = useStore();
  const { deleteSupplier, suppliersById, loading } = supplierStore;
  const [target, setTarget] = useState("");

  function handleSupplierDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    supplierId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteSupplier(supplierId);
  }

  return (
    <>
      <h1>Supplier</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/suppliers/createSupplier"
            positive
            content="Create Supplier"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {suppliersById.map((supplier) => (
            <Item key={supplier.supplierId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {supplier.supplierId}
                </Item.Header>
                <Item.Header as="a">{supplier.supplierName}</Item.Header>
                <Item.Description>
                  <div>Address: {supplier.supplierAddress}</div>
                </Item.Description>
                <Item.Description>
                  <div>Phone: {supplier.phone}</div>
                </Item.Description>

                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/suppliers/${supplier.supplierId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={supplier.supplierId}
                    loading={loading && target === supplier.supplierId}
                    onClick={(e) => handleSupplierDelete(e, supplier.supplierId)}
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
