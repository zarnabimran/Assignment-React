import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import UserForm from "../Children/UpdateForm";
import globals from "../../websiteGlobals/globals";
import axios from "axios";
import { Alert } from "antd";

const UpdateModal = ({ showing, onClose, data, updateUser }) => {
  const [error, setError] = useState("");
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (updatedData) => {
    onClose();
    axios({
      method: globals.API.User.Update.method,
      url: globals.API.baseUrl + globals.API.User.Update.url,
      data: updatedData,
    })
      .then((response) => {
        console.log(response);

        return updateUser(updatedData);
      })
      .catch((err) => {
        setError(err);
        console.log("err:", err);
      });
  };

  useEffect(() => {}, [data]);

  return (
    <div className="Modal-User">
      <Modal show={showing} animation={true} onHide={handleClose}>
        <Modal.Header className="header" closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm data={data} onSubmit={handleSubmit} onClose={handleClose} />
          {error ? <Alert message={error} type="error" /> : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateModal;
