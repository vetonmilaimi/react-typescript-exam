import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import SaleList from "./SaleList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function SaleDashboard() {
  const {saleStore} = useStore();
  const {loadSales, saleRegistry} = saleStore;


  useEffect(() => {
    if (saleRegistry.size <= 1) loadSales();
  }, [saleRegistry.size, loadSales]);

  if (saleStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <SaleList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
