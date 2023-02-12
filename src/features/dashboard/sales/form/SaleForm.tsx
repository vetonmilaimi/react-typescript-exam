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
import { Sale } from "../../../../app/models/sale";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function SaleForm() {
  const history = useNavigate();
  const { saleStore } = useStore();
  const {
    createSale,
    updateSale,
    loading,
    loadSale,
    loadingInitial
  } = saleStore;
  const { saleId } = useParams<{ saleId: string }>();

  const [sale, setSale] = useState({
    saleId: "",
    saleNote: "",
    bookId: "",
    staffId: "",
  });

  const validationSchema = Yup.object({
    saleNote: Yup.string().required("The Sale Note is required"),
    bookId: Yup.string().required("The Book Id is required"),
    staffId: Yup.string().required("The Staff Id is required"),
  });

  useEffect(() => {
    if (saleId)
      loadSale(saleId).then((sale) => setSale(sale!));
  }, [saleId, loadSale]);

  function handleFormSubmit(sale : Sale) {
    if(sale.saleId.length === 0) {
      let newSale = {
        ...sale,
        saleId: "0"
      }
      createSale(newSale).then(() => history(`/dashboard/sales/${newSale.saleId}`))
    } else {
      updateSale(sale).then (() => history(`/dashboard/sales/${sale.saleId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading sale..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={sale}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="saleNote" placeholder="Sale Note" />
                <MyTextInput name="bookId" placeholder="Book Id" />
                <MyTextInput name="staffId" placeholder="Staff Id" />

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
                  to="/dashboard/sales"
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
