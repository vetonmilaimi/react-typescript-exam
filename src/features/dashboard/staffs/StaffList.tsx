import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function StaffList() {
  const { staffStore } = useStore();
  const { deleteStaff, staffsById, loading } = staffStore;
  const [target, setTarget] = useState("");

  function handleStaffDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    staffId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteStaff(staffId);
  }

  return (
    <>
      <h1>Staff</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/staffs/createStaff"
            positive
            content="Create Staff"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {staffsById.map((staff) => (
            <Item key={staff.staffId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {staff.staffId}
                </Item.Header>
                <Item.Header as="a">{staff.staffId}</Item.Header>
                <Item.Description>
                  <div>Staff Position: {staff.staffPosition}</div>
                  <div>Salary: {staff.salary}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/staffs/${staff.staffId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={staff.staffId}
                    loading={loading && target === staff.staffId}
                    onClick={(e) =>
                      handleStaffDelete(e, staff.staffId)
                    }
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
