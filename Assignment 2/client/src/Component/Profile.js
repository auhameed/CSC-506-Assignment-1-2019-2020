import "../css/Home.css";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Table, Card } from "react-bootstrap";

const Profile = ({ addProfile }) => {
  const [option, setOption] = React.useState(1);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, seFile] = useState("");
  const [passport, setPassport] = useState("");
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState("");
  const [data, setData] = useState(JSON.parse(localStorage.getItem("profile")));
  let history = useHistory();

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setFullname(data.fullname);
      setUsername(data.username);
      setAddress(data.address);
      setPhone(data.phone);
      setPassport(data.passport);
    } else {
      history.push("/");
    }
  }, [data]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    seFile(e.target.files[0]);

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        seFile(file);
        setPassport(result);
      })
      .catch((err) => {
        console.log(err);
      });
    seFile(e.target.files[0]);
  };

  const handleSubmit = (evt) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const userId = user._id;
    evt.preventDefault();
    if (option === 3) {
      axios
        .put("http://localhost:4000/user/" + userId + "/change-password", {
          oldpassword,
          newpassword,
        })
        .then((user) => {
          if (user.status === 200) {
            setLoader(false);
            setOption(1);
          } else {
            console.log("error has happen");
            setLoader(false);
          }
        })
        .catch((err) => console.log(err));
    } else if (option === 2) {
      if (username === "") {
        NotificationManager.warning("Username is required.");
      }

      if (address === "") {
        NotificationManager.warning("Address is required.");
      }

      if (email === "") {
        NotificationManager.warning("Email is required.");
      }

      if (fullname === "") {
        NotificationManager.warning("Name is required.");
      }

      if (phone === "") {
        NotificationManager.warning("Name is required.");
      }
      const model = {
        email,
        fullname,
        username,
        phone,
        address,
      };
      // setOption(1);

      axios
        .put("http://localhost:4000/user/" + userId, model)
        .then((user) => {
          if (user.status === 200) {
            setLoader(false);
            addProfile(user.data.updatedUser);
            setOption(1);
            console.log("user", user);
          } else {
            console.log("error has happen");
            setLoader(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <LoadingOverlay active={loader} spinner text="Fetching Data">
      <div className="container">
        <header>
          <div
            className={
              "header-headings " +
              (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
            }
          >
            <span>My Profile</span>
            <span>Edit Profile</span>
            <span>Change Password</span>
          </div>
        </header>
        <ul className="options">
          <li
            className={option === 1 ? "active" : ""}
            onClick={() => setOption(1)}
          >
            View
          </li>
          <li
            className={option === 2 ? "active" : ""}
            onClick={() => setOption(2)}
          >
            Edit
          </li>
          <li
            className={option === 3 ? "active" : ""}
            onClick={() => setOption(3)}
          >
            Change Password
          </li>
        </ul>

        {option === 1 && (
          <div className="account-form" style={{ alignItems: "center" }}>
            <img
              src={passport}
              height="100"
              width="100"
              className="img-thumbnail float-right"
              alt="dp"
            />
            <Card style={{ width: "100%", marginTop: "1em" }}>
              <Card.Body>
                <Table striped bordered hover>
                  <tr>
                    <th>Email</th>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th>Userame</th>
                    <td>{username}</td>
                  </tr>
                  <tr>
                    <th>Full Name</th>
                    <td>{fullname}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{phone}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{address}</td>
                  </tr>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )}
        {option === 2 && (
          <>
            <form
              className="account-form"
              onSubmit={(evt) => handleSubmit(evt)}
            >
              <div
                className={
                  "account-form-fields " +
                  (option === 1
                    ? "sign-in"
                    : option === 2
                    ? "sign-up"
                    : "forgot")
                }
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Userame"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  min="1"
                  placeholder="Phone Number"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {/* <input
                  id="passport"
                  name="passport"
                  type="file"
                  placeholder="Choose Passport"
                  required
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => handleFileInputChange(e)}
                  // value={passport}
                /> */}
              </div>
              <button className="btn-submit-form" type="submit">
                {`Edit Profile`}
              </button>
            </form>
          </>
        )}
        {option === 3 && (
          <>
            <form
              className="account-form"
              onSubmit={(evt) => handleSubmit(evt)}
            >
              <div className={"account-form-fields "}>
                <input
                  id="oldPassword"
                  name="oldpassword"
                  type="password"
                  placeholder="Old Password"
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldpassword}
                />
                <input
                  id="password"
                  name="newpassword"
                  type="password"
                  placeholder="New Password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newpassword}
                />
              </div>
              <button
                className="btn-submit-form"
                type="submit"
              >{`Change Password`}</button>
            </form>
          </>
        )}

        <footer>
          <a href="#" target="_blank">
            Yusuf Kowiyu Assignment
          </a>
        </footer>
        <NotificationContainer />
      </div>
    </LoadingOverlay>
  );
};

export default Profile;
