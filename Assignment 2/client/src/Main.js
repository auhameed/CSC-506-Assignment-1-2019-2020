import React, { useState, useEffect } from "react";
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import Home from "./Component/Home";
import Profile from "./Component/Profile";
import Login from "./Component/Login";
import ShowPost from "./Component/ShowPost";
import NewPost from "./Component/NewPost";
import Register from "./Component/Register";


import "react-notifications/lib/notifications.css";

const Main = () => {
  const [profile, setProfile] = React.useState("");

  const addProfile = (profile) => {
    setProfile(profile);
  };

  useEffect(() => {
    const data = localStorage.getItem("profile");

    if (data) {
      setProfile(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    console.log("profile2", profile);
    localStorage.setItem("profile", JSON.stringify(profile));
  });

  return (
    <HashRouter>
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#DevNavbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <NavLink className="navbar-brand" to="/">
                <span className="rwd-line">
                  Assignment<i className="fa fa-empire" aria-hidden="true"></i>{" "}
                  2
                </span>
              </NavLink>
            </div>

            <div className="collapse navbar-collapse" id="DevNavbar">
              <ul className="nav navbar-nav navbar-right text-center">
                <li className="home_btn">
                  <NavLink exact to="/">
                    {" "}
                    HOME
                  </NavLink>
                </li>
                {profile === "" ? (
                  <>
                    <li className="about_btn">
                      <NavLink to="/login"> LOGIN</NavLink>
                    </li>
                    <li className="portfolio_btn">
                      <NavLink to="/register"> REGISTER</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="contact_btn">
                      <NavLink to="/newpost">NEW POST</NavLink>
                    </li>
                    <li className="contact_btn">
                      <NavLink to="/profile"> PROFILE</NavLink>
                    </li>
                    <li className="contact_btn">
                      <NavLink to="/logout"> LOGOUT</NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:id" component={ShowPost} />
          <Route
            exact
            path="/newpost"
            component={() => (
              <NewPost addProfile={addProfile} profile={profile} />
            )}
          />
          <Route
            exact
            path="/login"
            component={() => (
              <Login type={1} addProfile={addProfile} profile={profile} />
            )}
          />
          <Route
            exact
            path="/register"
            component={() => (
              <Login type={2} addProfile={addProfile} profile={profile} />
            )}
          />
          <Route
            exact
            path="/logout"
            component={() => {
              setProfile("");
              return <Redirect to="/" />;
            }}
          />
          <Route
            exact
            path="/profile"
            component={() => (
              <Profile addProfile={addProfile} profile={profile} />
            )}
          />
        </div>
      </div>
    </HashRouter>
  );
};

export default Main;
