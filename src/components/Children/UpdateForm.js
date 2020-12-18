import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";

let regex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const UserForm = ({ data, onSubmit, onClose }) => {

  const [name, setName] = useState(data[0].name);
  const [email, setEmail] = useState(data[0].emailAddress);
  const [phone, setPhone] = useState(data[0].phoneNumber);
  const [website, setWebsite] = useState(data[0].website);
  useEffect(() => {}, [data]);

  const changeHandler = (event) => {
    console.log("event", event);

    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;

      case "email":
        setEmail(event.target.value);
        break;

      case "phone":
        setPhone(event.target.value);
        break;

      case "website":
        setWebsite(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (data) => {
    if (!email.match(regex)) {
      return;
    }
    if (!name || !phone || !website || !email) {
      return;
    }
    const updatedData = {
      id: data[0]._id,
      name: name,
      phoneNumber: phone,
      emailAddress: email,
      website: website,
    };

    onSubmit(updatedData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="update-forms">
      <Form
        name="basic"
        initialValues={data[0]}
        // form={/}
        layout="Horizontal"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input onChange={changeHandler} name="name" />
        </Form.Item>

        <Form.Item
          label="email"
          name="emailAddress"
          rules={[
            {
              type: `email`,
              required: true,
              message: "Invalid email",
            },
          ]}
        >
          <Input onChange={changeHandler} name="email" />
        </Form.Item>

        <Form.Item
          label="phone"
          name="phoneNumber"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input onChange={changeHandler} name="phone" />
        </Form.Item>

        <Form.Item
          label="website"
          name="website"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input onChange={changeHandler} name="website" />
        </Form.Item>
        <div className="modal-buttons">
          <Button className="submit" onClick={() => handleSubmit(data)}>
            Submit
          </Button>
          <Button className="Close" onClick={() => handleClose}>
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
