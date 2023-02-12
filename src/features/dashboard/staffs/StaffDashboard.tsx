import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import StaffList from "./StaffList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function StaffDashboard() {
  const {staffStore} = useStore();
  const {loadStaffs, staffRegistry} = staffStore;


  useEffect(() => {
    if (staffRegistry.size <= 1) loadStaffs();
  }, [staffRegistry.size, loadStaffs]);

  if (staffStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <StaffList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
