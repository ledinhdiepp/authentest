import React, { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "user": {}
    };
  }
  componentDidMount(){
    this.loadDataProfile()
  }
  loadDataProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization","Bearer " + localStorage.getItem("accessToken"));
    

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:1337/customer-infos", requestOptions)
      .then((response) => {
          if(response.ok){
              return response.json()
          }
          throw Error(response.status)
        })
      .then((result) => {
          console.log(result)
          this.setState({user : result})
        })
      .catch((error) => {
          console.log("error", error)
            this.logout()
    });
  }
  logout = () => {
    localStorage.removeItem("accessToken");
    this.props.onLogoutSuccess()
  };
  render() {
    return (
      <div>
        {/* <div>Name: {this.state.user.lastname}</div>
        <div>Phone: {this.state.user.firm}</div> */}

        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}
