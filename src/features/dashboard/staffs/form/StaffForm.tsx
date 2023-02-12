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
import { Staff } from "../../../../app/models/staff";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function StaffForm() {
  const history = useNavigate();
  const { staffStore } = useStore();
  const {
    createStaff,
    updateStaff,
    loading,
    loadStaff,
    loadingInitial
  } = staffStore;
  const { staffId } = useParams<{ staffId: string }>();

  const [staff, setStaff] = useState({
    staffId: "",
    staffPosition: "",
    salary: "",
  });

  const validationSchema = Yup.object({
    staffPosition: Yup.string().required("The Staff Position is required"),
    salary: Yup.string().required("The Salary is required"),
  });

  useEffect(() => {
    if (staffId)
      loadStaff(staffId).then((staff) => setStaff(staff!));
  }, [staffId, loadStaff]);

  function handleFormSubmit(staff : Staff) {
    if(staff.staffId.length === 0) {
      let newStaff = {
        ...staff,
        staffId: "0"
      }
      createStaff(newStaff).then(() => history(`/dashboard/staffs/${newStaff.staffId}`))
    } else {
      updateStaff(staff).then (() => history(`/dashboard/staffs/${staff.staffId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading staff..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={staff}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="staffId" placeholder="Staff Id" />
                <MyTextInput name="staffPosition" placeholder="Staff Position" />
                <MyTextInput name="salary" placeholder="Salary" />

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
                  to="/dashboard/staffs"
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
