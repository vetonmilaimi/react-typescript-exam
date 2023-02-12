import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function UserList() {
  const { usersStore } = useStore();
  const { deleteUser, usersById, loading } = usersStore;
  const [target, setTarget] = useState("");

  function handleUserDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    userId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteUser(userId);
  }

  return (
    <>
      <h1>User</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/users/createUser"
            positive
            content="Create User"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {usersById.map((user) => (
            <Item key={user.userId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {user.userId}
                </Item.Header>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {user.username}
                </Item.Header>
                <Item.Description>
                  <div>Name: {user.name}</div>
                </Item.Description>
                <Item.Description>
                  <div>Surname: {user.surname}</div>
                </Item.Description>
                <Item.Description>
                  <div>Email: {user.email}</div>
                </Item.Description>
                <Item.Description>
                  <div>Hashed Password: {user.password}</div>
                </Item.Description>
                <Item.Description>
                  <div>Role: {user.roleName}</div>
                </Item.Description>
          

                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/users/${user.userId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={user.userId}
                    loading={loading && target === user.userId}
                    onClick={(e) => handleUserDelete(e, user.userId)}
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
