import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "../../app/layout/styles.css";
import { Review } from "../../app/models/review";
import { Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

export default function BestSellers() {
  const { reviewStore } = useStore();
  const { createReview } = reviewStore;
  const { reviewId } = useParams<{ reviewId: string }>();

  const [review, setReview] = useState({
    reviewId: "",
    email: "",
    reviewText: "",
  });

  function handleFormSubmit(review: Review) {
    if (review.reviewId.length === 0) {
      let newReview = {
        ...review,
        reviewId: "0",
      };
      createReview(newReview);
    }
  }
  return (
    <>
      <h2>
        <span>Reviews</span>
      </h2>
      <div>
        <div className="HomeReview">
          <Segment clearing className={"HomeReview"}>
            <Formik
              enableReinitialize
              initialValues={review}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({ handleSubmit }) => (
                <Form
                  className="ui form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <MyTextInput name="email" placeholder="Email" />
                  <MyTextArea
                    name="reviewText"
                    placeholder="Review Text"
                    rows={5}
                  />

                  <Button
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                </Form>
              )}
            </Formik>
          </Segment>
        </div>
      </div>
    </>
  );
}
