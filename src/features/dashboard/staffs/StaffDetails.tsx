import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function StaffDetails() {
  const { staffStore } = useStore();
  const {
    selectedStaff: staff,
    loadStaff,
    loadingInitial,
  } = staffStore;
  const { staffId } = useParams<{ staffId: string }>();

  useEffect(() => {
    if (staffId) loadStaff(staffId);
  }, [staffId, loadStaff]);

  if (loadingInitial || !staff) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{staff.staffId}</Card.Header>
          <Card.Description>Staff Position: {staff.staffPosition}</Card.Description>
          <Card.Description>Salary: {staff.salary}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/staffs/${staff.staffId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/staffs'
              basic
              color="red"
            >
              Cancel
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
    </>
  );
});
