import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import User from "./UserList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function UserDashboard() {
  const {usersStore} = useStore();
  const {loadUsers, userRegistry} = usersStore;

  useEffect(() => {
    if (userRegistry.size <= 1) loadUsers();
  }, [userRegistry.size, loadUsers]);

  if (usersStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <User />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
