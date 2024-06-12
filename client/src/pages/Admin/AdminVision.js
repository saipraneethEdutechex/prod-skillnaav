import React, {
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";
import { Modal, Form, Input, Button, message, List, Skeleton } from "antd";
import axios from "axios";

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
    <div>
      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Vision Head</h1>
        <hr className="my-2" />
        <p className="mb-4">
          <span className="font-semibold">Heading: </span>
          {visionhead[0].visionheading}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Sub Heading: </span>
          {visionhead[0].visionsub}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Image: </span>
          {visionhead[0].visionImg}
        </p>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => openModal("editHead", visionhead[0])}
            className="mr-2"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Vision Points</h1>
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
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => handleDelete(item._id)}
                  key="delete"
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
          <Button type="primary" onClick={() => openModal("addPoint")}>
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
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          {modalData.type === "editHead" && (
            <>
              <Form.Item
                name="visionheading"
                label="Vision Heading"
                rules={[
                  { required: true, message: "Please enter vision heading" },
                ]}
              >
                <Input />
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
                <Input />
              </Form.Item>
              <Form.Item
                name="visionImg"
                label="Vision Image"
                rules={[
                  { required: true, message: "Please enter vision image URL" },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
          modalData.type !== "editHead" && (
          <Form.Item
            name="visionpoint"
            label="Vision Point"
            rules={[{ required: true, message: "Please enter vision heading" }]}
          >
            <Input />
          </Form.Item>
          )
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              {modalData.type === "addPoint" ? "Add" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default React.memo(AdminVision);
