import { Formik, yupToFormErrors } from "formik";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import AuthService from "./AuthService";
import * as Yup from 'yup'
import Navbar from "../components/NavBar";

export default observer(function RefisterFrom() {

  
  return (
    <>
    <Navbar />
    <Formik
      initialValues={{ username: "", name: "", surname: "", email: "", password: ""}}
      onSubmit={values => AuthService.register(values)}
      validationSchema={Yup.object({
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
      })}
      
    >
      
      {({ handleSubmit, isSubmitting,dirty,isValid  }) => (
        <Form className="account" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="name" placeholder="Name" />
          <MyTextInput name="surname" placeholder="Surname" />
          <MyTextInput name="email" placeholder="Email" type="email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          
        
          <Button
            disabled={!isValid || !dirty || isSubmitting} 
            positive
            content="Register"
            type="submit"
            fluid
          />
          
          <Label>Already have an account? <a href="/login">Login.</a></Label>
        </Form>
      )}
      
    </Formik>
    </>
  );
});
