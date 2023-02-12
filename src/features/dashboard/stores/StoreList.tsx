import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function StoreList() {
  const { storeStore } = useStore();
  const { deleteStore, storesById, loading } = storeStore;
  const [target, setTarget] = useState("");

  function handleStoreDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    storeId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteStore(storeId);
  }

  return (
    <>
      <h1>Store</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/stores/createStore"
            positive
            content="Create Store"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {storesById.map((store) => (
            <Item key={store.storeId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {store.storeId}
                </Item.Header>
                <Item.Header as="a">{store.storeName}</Item.Header>
                <Item.Description>
                  <div>{store.address}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/stores/${store.storeId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={store.storeId}
                    loading={loading && target === store.address}
                    onClick={(e) =>
                      handleStoreDelete(e, store.storeId)
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
