import React, { useState, useMemo, useEffect } from "react";
import { Card, Row, Col } from "antd";
import UpdateModal from "../Modals/UpdateModal";
import { Alert } from "antd";
import "antd/dist/antd.css";

import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const UserCards = ({ users }) => {
  const [showModal, setshowModal] = useState(false);
  const [updateData, setupdateData] = useState();
  const [userInfo, setUserInfo] = useState(null);

  const showModalHandler = (id) => {
    const user = users.filter((user) => user._id === id);
    setupdateData(user);
    setshowModal(true);
  };

  useEffect(() => {
    setUserInfo(users);
  }, [users]);
  useMemo(() => {}, [updateData]);

  useEffect(() => {}, [userInfo]);

  const closeModalHandler = () => {
    setshowModal(false);
  };

  const updateUser = (data) => {
    let newData = users.map((userdata) => {
      if (userdata._id === data.id) {
        userdata.name = data.name;
        userdata.emailAddress = data.emailAddress;
        userdata.website = data.website;
        userdata.phoneNumber = data.phoneNumber;
        return userdata;
      }
      return userdata;
    });
    setUserInfo(newData);
  };

  const toggleHandler = (data) => {
    let newData = users.map((userdata) => {
      if (userdata._id === data._id) {
        if (userdata.check === true) {
          userdata.check = false;
          return userdata;
        }
        userdata.check = true;
        return userdata;
      }
      return userdata;
    });
    setUserInfo(newData);
  };

  const deleteHandler = (data) => {

    const newData = userInfo.filter((user) => user._id != data._id);
    setUserInfo(newData);
  };

  return (
    <div className="card">
      <Row>
        {userInfo != null
          ? userInfo.map((data) => {
              return (
                <Col span={6} key={data._id}>
                  <Card
                    // style={{ width: 440, height: 459.5, margin: 15 }}
                    className="Card"
                    cover={
                      <img
                        alt="example"
                        className="cardhead"
                        src={`https://avatars.dicebear.com/v2/avataaars/{{${data.userName}}}.svg?options[mood][]=happy`}
                        style={{ height: 200 }}
                      />
                    }
                    actions={
                      data.check
                        ? [
                            <HeartFilled
                              onClick={() => toggleHandler(data)}
                              style={{
                                fontSize: `20px`,
                                color: `rgb(255, 0, 0)`,
                              }}
                            />,
                            <EditOutlined
                              key="edit"
                              onClick={() => showModalHandler(data._id)}
                              id={data._id}
                            />,
                            <DeleteFilled
                              onClick={() => deleteHandler(data)}
                            />,
                          ]
                        : [
                            <HeartOutlined
                              onClick={() => toggleHandler(data)}
                              style={{
                                fontSize: `20px`,
                                color: `rgb(255, 0, 0)`,
                              }}
                            />,
                            <EditOutlined
                              key="edit"
                              onClick={() => showModalHandler(data._id)}
                              id={data._id}
                            />,
                            <DeleteFilled
                              onClick={() => deleteHandler(data)}
                            />,
                          ]
                    }
                  >
                    <div className="card-body">
                      <div className="name">
                        <strong>{data.name}</strong>
                      </div>
                      <div>
                        <span className="icons">
                          <MailOutlined />
                        </span>
                        <span>{data.emailAddress}</span>
                      </div>
                      <div>
                        <span className="icons">
                          <PhoneOutlined />
                        </span>
                        <span>{data.phoneNumber}</span>{" "}
                      </div>
                      <div>
                        <span className="icons">
                          <GlobalOutlined />
                        </span>
                        <span>{data.website}</span>{" "}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
      {showModal ? (
        <UpdateModal
          showing={showModal}
          onClose={closeModalHandler}
          data={updateData}
          updateUser={updateUser}
        />
      ) : null}
    </div>
  );
};

export default UserCards;
