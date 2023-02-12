import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import Navbar from "../components/NavBar";
import AuthService from "./AuthService";

export default observer(function LoginForm() {
  return (
    <>
    <Navbar />
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={values => AuthService.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className="account" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="password" placeholder="Password" type="password" />
        
          <Button
            loading={isSubmitting} 

            content="Login"
            type="submit"
            fluid
          />
          <Label>Don't have an account? <strong><a href="/register">Register.</a></strong></Label>
        </Form>
      )}
    </Formik>
    </>
  );
});
