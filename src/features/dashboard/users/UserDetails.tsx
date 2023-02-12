import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function UserDetails() {
  const { usersStore } = useStore();
  const {
    selectedUser: user,
    loadUser,
    loadingInitial,
  } = usersStore;
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) loadUser(userId);
  }, [userId, loadUser]);

  if (loadingInitial || !user) return <LoadingComponent />;

  return (
    <>
    <DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em", display: "flex", justifyContent: "center"}}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{user.userId }     {user.username}</Card.Header>
          <Card.Description>Name: {user.name}</Card.Description>
          <Card.Description>Surname: {user.surname}</Card.Description>
          <Card.Description>Email: {user.email}</Card.Description>
          <Card.Description>Hashed Password: {user.password}</Card.Description>
          <Card.Description>Role: {user.roleName}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/users/${user.userId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/users'
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
