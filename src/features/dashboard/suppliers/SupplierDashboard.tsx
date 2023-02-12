import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import SupplierList from "./SupplierList";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function SupplierDashboard() {
  const {supplierStore} = useStore();
  const {loadSuppliers, supplierRegistry} = supplierStore;


  useEffect(() => {
    if (supplierRegistry.size <= 1) loadSuppliers();
  }, [supplierRegistry.size, loadSuppliers]);

  if (supplierStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <SupplierList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
