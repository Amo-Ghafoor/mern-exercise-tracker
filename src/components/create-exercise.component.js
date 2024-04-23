import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { serverAddress } from '..';
export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
    this.onChangeBankName = this.onChangeBankName.bind(this);

    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      bankName : '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      banks : [],
    }
  }

  componentDidMount() {

    axios.get(`http://${serverAddress}:5000/bank/`).then(response => {
      if (response.data.length > 0) {
        this.setState({
          banks: response.data.map(bank => bank.name),
          bankName: response.data[0].name
        })
      }
      console.log(this.state.bank);

    }).catch((error) => {
      console.log(error);
    });


    axios.get(`http://${serverAddress}:5000/users/`)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      console.log(this.state)

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }
  onChangeExerciseName(e) {
    this.setState({
      exerciseName: e.target.value
    })
  }
  onChangeBankName(e) {
    this.setState({
      bankName: e.target.value
    })
  }


  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      exerciseName: this.state.bankName,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post(`http://${serverAddress}:5000/exercises/add`, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
    document.getElementById("success").innerHTML = "نام کاربری با موفقیت ساخته شد";

    function fade() {
      document.getElementById("success").innerHTML = "";
    }

    const myTimeout = setTimeout(fade, 2000);

  }

  render() {
    return (
      <div>
        <h3>ساخت برنامه ورزشی</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>:نام کاربری</label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>:انتخاب برنامه ورزشی</label>
            <select ref="exerciseInput"
              required
              className="form-control"
              value={this.state.bankName}
              onChange={this.onChangeBankName}>
              {
                  this.state.banks.map(function(bank) {
                    return <option 
                      key={bank}
                      value={bank}>{bank}
                      </option>;
                  })
              }
            </select>
          </div>
          <div className="form-group">
            <label>:توضیحات </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <label>:(برحسب دقیقه)مدت زمان</label>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>:تاریخ </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="ساخت برنامه" className="btn btn-primary" />
            <br />
            <br />
            <h5 id="success"></h5>
          </div>
        </form>
      </div>
    )
  }
}