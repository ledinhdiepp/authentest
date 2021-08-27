import React, { Component } from "react";
import Profile from "./Profile";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      isLogin : localStorage.getItem("accessToken") !=null
    };
  }
  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", this.state.identifier);
    urlencoded.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:1337/auth/local", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        this.setState({isLogin: true})
      })
      .catch((error) => {
        console.log("error", error);
        alert("Username, password is wrong");
      });
  };

  onLogoutSuccess = () =>{
    this.setState({isLogin: false})
  }
  render() {
    return (
      <div>
            {this.state.isLogin ?   
        <Profile key={this.state.isLogin}
          onLogoutSuccess = {this.onLogoutSuccess}
        />
                :
        <form>
          <div>
            <label>Username:</label>
            <input type="text" name="identifier" onChange={this.setParams} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.setParams} />
          </div>
          <div>
            <button type="button" onClick={this.login}>
              Login
            </button>
          </div>
        </form>
            }
      </div>

    );
  }
}
