import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import '../../../../app/layout/styles.css';
import { Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { Store } from "../../../../app/models/store";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function StoreForm() {
  const history = useNavigate();
  const { storeStore } = useStore();
  const {
    createStore,
    updateStore,
    loading,
    loadStore,
    loadingInitial
  } = storeStore;
  const { storeId } = useParams<{ storeId: string }>();

  const [store, setStore] = useState({
    storeId: "",
    storeName: "",
    address: "",
  });

  const validationSchema = Yup.object({
    storeName: Yup.string().required("The Store Name is required"),
    address: Yup.string().required("The Address is required"),
   });

  useEffect(() => {
    if (storeId)
      loadStore(storeId).then((store) => setStore(store!));
  }, [storeId, loadStore]);

  function handleFormSubmit(store: Store) {
    if(store.storeId.length === 0) {
      let newStore = {
        ...store,
        storeId: "0"
      }
      createStore(newStore).then(() => history(`/dashboard/stores/${newStore.storeId}`))
    } else {
      updateStore(store).then (() => history(`/dashboard/stores/${store.storeId}`))
    }
  }



  if(loadingInitial) return <LoadingComponent content="Loading store..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={'form'}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={store}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="storeName" placeholder="Store Name" />
                <MyTextArea
                  rows={2}
                  name="address"
                  placeholder="Address"
                />

                <Button
                disabled={isSubmitting || !dirty || !isValid}
                  loading={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  as={Link}
                  to="/dashboard/stores"
                  floated="right"
                  type="submit"
                  content="Cancel"
                />
              </Form>
            )}
          </Formik>
    </Segment>
    </div>
    </>
  );
});
