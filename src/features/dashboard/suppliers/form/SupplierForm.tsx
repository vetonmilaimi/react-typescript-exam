import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import "../../../../app/layout/styles.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { Supplier } from "../../../../app/models/supplier";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function SupplierForm() {
  const history = useNavigate();
  const { supplierStore } = useStore();
  const {
    createSupplier,
    updateSupplier,
    loading,
    loadSupplier,
    loadingInitial,
  } = supplierStore;
  const { supplierId } = useParams<{ supplierId: string }>();

  const [supplier, setSupplier] = useState({
    supplierId: "",
    supplierName: "",
    supplierAddress: "",
    phone: "",
  });

  const validationSchema = Yup.object({
    supplierName: Yup.string().required("The Supplier Name is required"),
    supplierAddress: Yup.string().required("The Supplier Address is required"),
    phone: Yup.string().required("The Phone is required"),
  });

  useEffect(() => {
    if (supplierId)
      loadSupplier(supplierId).then((supplier) => setSupplier(supplier!));
  }, [supplierId, loadSupplier]);

  function handleFormSubmit(supplier: Supplier) {
    if (supplier.supplierId.length === 0) {
      let newSupplier = {
        ...supplier,
        supplierId: "0",
      };
      createSupplier(newSupplier).then(() =>
        history(`/dashboard/suppliers/${newSupplier.supplierId}`)
      );
    } else {
      updateSupplier(supplier).then(() =>
        history(`/dashboard/suppliers/${supplier.supplierId}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading supplier..." />;
  return (
    <>
      <DashboardSideBar />
      <div>
        <Segment clearing className={"form"}>
          <Header content="Supplier Details" sub color="teal" />
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={supplier}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="supplierName" placeholder="Supplier Name" />
                <MyTextInput name="supplierAddress" placeholder="Supplier Address" />
                <MyTextInput name="phone" placeholder="Phone" />

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
                  to="/dashboard/suppliers"
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
