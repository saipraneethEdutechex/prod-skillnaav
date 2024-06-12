import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Button, message, List, Skeleton } from "antd";
import axios from "axios";

function AdminTeam() {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [isEditTeamModalVisible, setIsEditTeamModalVisible] = useState(false);
  const [isAddTeamModalVisible, setIsAddTeamModalVisible] = useState(false);
  const [isEditHeadingModalVisible, setIsEditHeadingModalVisible] =
    useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [form] = Form.useForm();
  const [headingForm] = Form.useForm();

  const fetchSkillnaavData = useCallback(async () => {
    try {
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      setSkillnaavData(response.data);
    } catch (error) {
      console.error("Error fetching skillnaav data:", error);
    }
  }, []);

  useEffect(() => {
    fetchSkillnaavData();
  }, [fetchSkillnaavData]);

  const onFinishEdit = useCallback(
    async (values) => {
      try {
        values._id = values._id || selectedTeamMember._id;
        const response = await axios.post(
          "/api/skillnaav/update-teammember",
          values
        );
        if (response.data.success) {
          message.success(response.data.message);
          setIsEditTeamModalVisible(false);
          fetchSkillnaavData();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Error updating team member:", error.message);
      }
    },
    [selectedTeamMember, fetchSkillnaavData]
  );

  const onFinishAdd = useCallback(
    async (values) => {
      try {
        const response = await axios.post(
          "/api/skillnaav/add-teammember",
          values
        );
        if (response.data.success) {
          message.success(response.data.message);
          setIsAddTeamModalVisible(false);
          fetchSkillnaavData();
          form.resetFields();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Error adding team member:", error.message);
      }
    },
    [fetchSkillnaavData, form]
  );

  const onFinishEditHeading = useCallback(
    async (values) => {
      try {
        values._id = skillnaavData.team[0]._id;
        const response = await axios.post(
          "/api/skillnaav/update-teamheading",
          values
        );
        if (response.data.success) {
          message.success(response.data.message);
          setIsEditHeadingModalVisible(false);
          fetchSkillnaavData();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Error updating team heading:", error.message);
      }
    },
    [skillnaavData, fetchSkillnaavData]
  );

  const onDelete = useCallback(
    async (teammemberId) => {
      try {
        const response = await axios.delete(
          `/api/skillnaav/delete-teammember/${teammemberId}`
        );
        if (response.data.success) {
          message.success(response.data.message);
          fetchSkillnaavData();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Error deleting team member:", error.message);
      }
    },
    [fetchSkillnaavData]
  );

  const handleEditTeamMember = useCallback(
    (teammember) => {
      setSelectedTeamMember(teammember);
      form.setFieldsValue(teammember);
      setIsEditTeamModalVisible(true);
    },
    [form]
  );

  const handleEditHeading = useCallback(() => {
    if (skillnaavData && skillnaavData.team && skillnaavData.team.length > 0) {
      headingForm.setFieldsValue(skillnaavData.team[0]);
      setIsEditHeadingModalVisible(true);
    }
  }, [skillnaavData, headingForm]);

  if (!skillnaavData) {
    return <Skeleton active />;
  }

  const { team, teammember } = skillnaavData;

  return (
    <div>
      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Team</h1>
        <hr className="my-2" />
        {team && team.length > 0 && (
          <>
            <p className="mb-4">
              <span className="font-semibold">Heading: </span>
              {team[0].teamheading}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Sub Heading: </span>
              {team[0].teamsubheading}
            </p>
            <div className="flex justify-end mt-4">
              <Button type="primary" onClick={handleEditHeading}>
                Edit Heading
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Team Members</h1>
        <hr className="my-2" />
        <List
          itemLayout="horizontal"
          dataSource={teammember}
          renderItem={(member) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleEditTeamMember(member)}
                  key="edit"
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => onDelete(member._id)}
                  key="delete"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={member.teammemberName}
                description={member.teammemberDesgn}
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => setIsAddTeamModalVisible(true)}
        >
          Add Team Member
        </Button>
      </div>

      {/* Edit Team Member Modal */}
      <Modal
        title="Edit Team Member"
        visible={isEditTeamModalVisible}
        onCancel={() => setIsEditTeamModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinishEdit}>
          <Form.Item name="_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="teammemberName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberDesgn" label="Position">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberDesc" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberLinkedin" label="LinkedIn">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Team Member Modal */}
      <Modal
        title="Add Team Member"
        visible={isAddTeamModalVisible}
        onCancel={() => setIsAddTeamModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinishAdd}>
          <Form.Item name="teammemberName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberDesgn" label="Position">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberDesc" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="teammemberLinkedin" label="LinkedIn">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Team Heading Modal */}
      <Modal
        title="Edit Team Heading"
        visible={isEditHeadingModalVisible}
        onCancel={() => setIsEditHeadingModalVisible(false)}
        footer={null}
      >
        <Form form={headingForm} onFinish={onFinishEditHeading}>
          <Form.Item name="teamheading" label="Heading">
            <Input />
          </Form.Item>
          <Form.Item name="teamsubheading" label="Sub Heading">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminTeam;
