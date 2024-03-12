import React, { Component } from 'react';
import axios from 'axios';
import { serverAddress} from '..';


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post(`http://${serverAddress}:5000/users/add`, user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
    document.getElementById("success").innerHTML = "نام کاربری با موفقیت ساخته شد";
    
    function fade() {
      document.getElementById("success").innerHTML = "";
    }
    
    const myTimeout = setTimeout(fade, 2000);
  }

  render() {
    return (
      <div>
        <h3>ساخت کاربر جدید</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label> :نام کاربری</label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
          <input type="submit" value="تایید نام کاربری" className="btn btn-primary" />
          <br/>
          <br/>
          <h5 id="success"></h5>
          </div>
        </form>
      </div>
    )
  }
}