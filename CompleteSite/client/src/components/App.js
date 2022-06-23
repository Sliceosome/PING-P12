import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "../services/auth.service";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Profile from "./Profile";

import EventBus from "../common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showNavbar: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showNavbar: true,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showNavbar: false,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <div className="container mt-3">
          <BrowserRouter>
          { this.state.showNavbar ? ( <nav className="navbar navbar-expand navbar-dark bg-dark" >
          <Link to={"/"} className="navbar-brand">
            Irudigi
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

              <li className="nav-item">
                <Link to={"/history"} className="nav-link">
                  History
                </Link>
              </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this?.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav> ) : (<></>)}
          <Routes>
            <Route exact path={"/"} element={<Login/>} />
            <Route exact path={"/home"} element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/history"} component={Profile} />
            {/* <Route path="/history" component={Profile} /> */}
          </Routes>
          </BrowserRouter>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;

