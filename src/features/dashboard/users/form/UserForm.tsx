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
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { roleOptions } from "../../../../app/common/options/RoleOptions";
import { User } from "../../../../app/models/user";
import DashboardSideBar from "../../DashboardSideBar";

export default observer(function UserForm() {
  const history = useNavigate();
  const { usersStore } = useStore();
  const { createUser, updateUser, loading, loadUser, loadingInitial } =
    usersStore;
  const { userId } = useParams<{ userId: string }>();

  const [user, setUser] = useState({
    userId: "",
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    roleName: "",
    
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("The User Name is required"),
    name: Yup.string().required("The Name is required"),
    surname: Yup.string().required("The Surname is required"),
    email: Yup.string().required("The Email is required"),
    password: Yup.string().required("The Password is required"),
    roleName: Yup.string().required("The Role name is required"),
  });

  useEffect(() => {
    if (userId) loadUser(userId).then((user) => setUser(user!));
  }, [userId, loadUser]);

  function handleFormSubmit(user: User) {
    if (user.userId.length === 0) {
      let newUser = {
        ...user,
        userId: "0",
      };
      createUser(newUser).then(() =>
        history(`/dashboard/users/${newUser.userId}`)
      );
    } else {
      updateUser(user).then(() => history(`/dashboard/users/${user.userId}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading user..." />;
  return (
    <>
      <DashboardSideBar />
      <div>
        <Segment clearing className={"form"}>
          <Header content="User Details" sub color="teal"/>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={user}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="username" placeholder="Username" />
                <MyTextInput name="name" placeholder="Name" />
                <MyTextInput name="surname" placeholder="Surname" />
                <MyTextInput name="email" placeholder="Email" />
              
                <MySelectInput
                  options={roleOptions}
                  name="roleName"
                  placeholder="Role Name"
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
                  to="/dashboard/users"
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
