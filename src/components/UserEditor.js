import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Modals/UserCard";
import globals from "../websiteGlobals/globals";
import Spinner from "react-spinkit";
import { Alert } from "antd";

const UserEditor = () => {
  const [userData, setuserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserDataApi = useCallback(() => {
    axios({
      method: globals.API.User.get.method,
      url: globals.API.baseUrl + globals.API.User.get.url,
    })
      .then((response) => {
        if (response.data.data) {
          setuserData(response.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUserDataApi();
  }, [getUserDataApi]);

  return (
    <div className="card-body-holder">
      {loading ? (
        <Spinner name="paceman" className="spinner" />
      ) : (
        <Cards users={userData} />
      )}
      {error ? <Alert message={error} type="error" /> : null}
    </div>
  );
};

export default UserEditor;
