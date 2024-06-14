import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Button, message, List, Skeleton } from "antd";
import axios from "axios";

const { TextArea } = Input;

const AdminVision = () => {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [modalData, setModalData] = useState({
    isVisible: false,
    type: "",
    data: null,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSkillnaavData();
  }, []);

  const fetchSkillnaavData = useCallback(async () => {
    try {
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      setSkillnaavData(response.data);
    } catch (error) {
      console.error("Error fetching skillnaav data:", error);
    }
  }, []);

  const handleFinish = useCallback(
    async (values) => {
      try {
        let response;
        if (modalData.type === "editHead") {
          response = await axios.post("/api/skillnaav/update-visionheading", {
            ...values,
            _id: modalData.data._id,
          });
        } else if (modalData.type === "editPoint") {
          values._id = modalData.data._id;
          response = await axios.post(
            "/api/skillnaav/update-visionpoint",
            values
          );
        } else if (modalData.type === "addPoint") {
          response = await axios.post("/api/skillnaav/add-visionpoint", values);
        }

        if (response.data.success) {
          message.success(response.data.message);
          setModalData({ isVisible: false, type: "", data: null });
          fetchSkillnaavData();
          form.resetFields();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error(`Error ${modalData.type} vision data: ${error.message}`);
      }
    },
    [modalData, form, fetchSkillnaavData]
  );

  const handleDelete = useCallback(
    async (visionpointId) => {
      try {
        const response = await axios.delete(
          `/api/skillnaav/delete-visionpoint/${visionpointId}`
        );
        if (response.data.success) {
          message.success(response.data.message);
          fetchSkillnaavData();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error(`Error deleting vision point: ${error.message}`);
      }
    },
    [fetchSkillnaavData]
  );

  const openModal = useCallback(
    (type, data = null) => {
      setModalData({ isVisible: true, type, data });
      if (data) form.setFieldsValue(data);
    },
    [form]
  );

  if (!skillnaavData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Skeleton active avatar />
      </div>
    );
  }

  const { visionhead, visionpoint } = skillnaavData;

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="border p-4 rounded-lg mb-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold mb-2">Vision Head</h1>
        <hr className="my-2" />
        <p className="mb-4">
          <span className="font-semibold">Heading: </span>
          {visionhead[0]?.visionheading}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Sub Heading: </span>
          {visionhead[0]?.visionsub}
        </p>
        <div className="mb-4">
          <span className="font-semibold">Image: </span>
          <img
            src={visionhead[0]?.visionImg}
            alt="Vision Image"
            className="max-w-full h-auto rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => openModal("editHead", visionhead[0])}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold mb-2">Vision Points</h1>
        <hr className="my-2" />
        <List
          itemLayout="horizontal"
          dataSource={visionpoint}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => openModal("editPoint", item)}
                  key="edit"
                  className="text-blue-500"
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => handleDelete(item._id)}
                  key="delete"
                  className="text-red-500"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta title={item.visionpoint} />
            </List.Item>
          )}
        />
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => openModal("addPoint")}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Point
          </Button>
        </div>
      </div>

      {/* Edit/Add Vision Modal */}
      <Modal
        visible={modalData.isVisible}
        title={
          modalData.type === "editHead"
            ? "Edit Vision Head"
            : modalData.type === "editPoint"
            ? "Edit Vision Point"
            : "Add Vision Point"
        }
        onCancel={() =>
          setModalData({ isVisible: false, type: "", data: null })
        }
        footer={null}
        className="p-4 md:p-8 lg:p-12"
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          {modalData.type === "editHead" ? (
            <>
              <Form.Item
                name="visionheading"
                label="Vision Heading"
                rules={[
                  { required: true, message: "Please enter vision heading" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="visionsub"
                label="Vision Sub Heading"
                rules={[
                  {
                    required: true,
                    message: "Please enter vision sub heading",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="visionImg"
                label="Vision Image"
                rules={[
                  { required: true, message: "Please enter vision image URL" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="visionpoint"
              label="Vision Point"
              rules={[{ required: true, message: "Please enter vision point" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          )}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {modalData.type === "addPoint" ? "Add" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default React.memo(AdminVision);
