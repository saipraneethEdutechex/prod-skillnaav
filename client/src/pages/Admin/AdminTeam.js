import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Button, message, List, Skeleton } from "antd";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const { TextArea } = Input;

function AdminTeam() {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditTeamModalVisible, setIsEditTeamModalVisible] = useState(false);
  const [isAddTeamModalVisible, setIsAddTeamModalVisible] = useState(false);
  const [isEditHeadingModalVisible, setIsEditHeadingModalVisible] =
    useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [form] = Form.useForm();
  const [headingForm] = Form.useForm();
  const [imgUrl, setImgUrl] = useState(null);

  const fetchSkillnaavData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      setSkillnaavData(response.data.teammember);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching SkillNaav data:", error);
      setLoading(false);
      message.error("Failed to fetch team members");
    }
  }, []);

  useEffect(() => {
    fetchSkillnaavData();
  }, [fetchSkillnaavData]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      fileRef
        .put(selectedFile)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          setImgUrl(downloadURL);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          message.error("Failed to upload file");
        });
    } else {
      console.log("No file selected");
    }
  };

  const onFinishEdit = useCallback(
    async (values) => {
      try {
        values._id = selectedTeamMember._id;
        const response = await axios.put(
          `/api/skillnaav/update-teammember/${values._id}`,
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
        values.image = imgUrl;
        const response = await axios.post(
          "/api/skillnaav/add-teammember",
          values
        );
        if (response.data.success) {
          message.success(response.data.message);
          setIsAddTeamModalVisible(false);
          fetchSkillnaavData();
          form.resetFields();
          setImgUrl(null);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Error adding team member:", error.message);
      }
    },
    [fetchSkillnaavData, form, imgUrl]
  );

  const onFinishEditHeading = useCallback(
    async (values) => {
      try {
        const teamId =
          skillnaavData && skillnaavData.length > 0
            ? skillnaavData[0]._id
            : null;
        if (!teamId) {
          message.error("Team data not available");
          return;
        }
        values._id = teamId;
        const response = await axios.put(
          `/api/skillnaav/update-teamheading/${values._id}`,
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
    if (skillnaavData && skillnaavData.length > 0) {
      headingForm.setFieldsValue({
        teamheading: skillnaavData[0].teamheading,
        teamsubheading: skillnaavData[0].teamsubheading,
      });
      setIsEditHeadingModalVisible(true);
    }
  }, [skillnaavData, headingForm]);

  if (loading || skillnaavData === null) {
    return <Skeleton active />;
  }

  return (
    <div>
      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Team</h1>
        <hr className="my-2" />
        {skillnaavData.length > 0 && (
          <>
            <p className="mb-4">
              <span className="font-semibold">Heading: </span>
              {skillnaavData[0].teamheading}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Sub Heading: </span>
              {skillnaavData[0].teamsubheading}
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
          dataSource={skillnaavData}
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
                  danger
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
              {member.image && (
                <img
                  src={member.image}
                  alt={member.teammemberName}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
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

      <Modal
        title="Edit Team Member"
        visible={isEditTeamModalVisible}
        onCancel={() => setIsEditTeamModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinishEdit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="teammemberName" label="Name">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="teammemberDesgn" label="Position">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="teammemberDesc" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="teammemberLinkedin" label="LinkedIn">
            <TextArea rows={2} />
          </Form.Item>
          <input type="file" onChange={handleFileUpload} />
          {imgUrl && (
            <div style={{ marginTop: 10 }}>
              <img
                src={imgUrl}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Team Member"
        visible={isAddTeamModalVisible}
        onCancel={() => setIsAddTeamModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinishAdd}>
          <Form.Item name="teammemberName" label="Name">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="teammemberDesgn" label="Position">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="teammemberDesc" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="teammemberLinkedin" label="LinkedIn">
            <TextArea rows={2} />
          </Form.Item>
          <input type="file" onChange={handleFileUpload} />
          {imgUrl && (
            <div style={{ marginTop: 10 }}>
              <img
                src={imgUrl}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
