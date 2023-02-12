import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Stock from "./StockList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function StockDashboard() {
  const {stockStore} = useStore();
  const {loadStocks, stockRegistry} = stockStore;


  useEffect(() => {
    if (stockRegistry.size <= 1) loadStocks();
  }, [stockRegistry.size, loadStocks]);

  if (stockStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <Stock />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
