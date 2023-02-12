import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import StoreList from "./StoreList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function StoreDashboard() {
  const {storeStore} = useStore();
  const {loadStores, storeRegistry} = storeStore;


  useEffect(() => {
    if (storeRegistry.size <= 1) loadStores();
  }, [storeRegistry.size, loadStores]);

  if (storeStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <StoreList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
