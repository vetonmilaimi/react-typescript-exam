import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import "../../../../app/layout/styles.css";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";

import { Stock } from "../../../../app/models/stock";
import DashboardSideBar from "../../DashboardSideBar";

export default observer(function StockForm() {
  const history = useNavigate();
  const { stockStore } = useStore();
  const { createStock, updateStock, loading, loadStock, loadingInitial } =
  stockStore;
  const { stockId } = useParams<{ stockId: string }>();

  const [stock, setStock] = useState({
    stockId: "",
    amount: "",
    bookId: "",
   
  });

  const validationSchema = Yup.object({
    bookId: Yup.string().required("The Book Id  is required"),

  });

  useEffect(() => {
    if (stockId) loadStock(stockId).then((stock) => setStock(stock!));
  }, [stockId, loadStock]);

  function handleFormSubmit(stock: Stock) {
    if (stock.stockId.length === 0) {
      let newStock = {
        ...stock,
        stockId: "0",
      };
      createStock(newStock).then(() =>
        history(`/dashboard/stocks/${newStock.stockId}`)
      );
    } else {
      updateStock(stock).then(() => history(`/dashboard/stocks/${stock.stockId}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading stock..." />;
  return (
    <>
      <DashboardSideBar />
      <div>
        <Segment clearing  className={"form"}>
          <Header content="Stock Details" sub color="teal"/>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={stock}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="bookId" placeholder="Book Id" />
                <MyTextInput name="amount" placeholder="Amount" />
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
                  to="/dashboard/stocks"
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
