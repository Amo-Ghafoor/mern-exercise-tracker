import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { serverAddress} from '..';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
    this.onChangeBankName = this.onChangeBankName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bankName: '',
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      banks: [],
    }
  }

  componentDidMount() {
    axios.get(`http://${serverAddress}:5000/exercises/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          bankName: response.data.exerciseName,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(`http://${serverAddress}:5000/users/`)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get(`http://${serverAddress}:5000/bank/`)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            banks: response.data.map(bank => bank.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

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

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
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
    console.log(this.state);
    axios.put(`http://${serverAddress}:5000/exercises/update/` + this.props.match.params.id, exercise)
      .then(res =>{ console.log(res.data);    
      })
      .catch((error) => {
        console.log(error);
        
      })

    document.getElementById("success").innerHTML = "برنامه ورزشی با موفقیت ویرایش شد";
    
    function fade() {
      document.getElementById("success").innerHTML = "";
      window.location = '/';
    }
    
    const myTimeout = setTimeout(fade, 1500);

  }
  
  render() {
    return (
    <div>
      <h3>ویرایش برنامه ورزشی</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>:نام کاربری </label>
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
          <label>:توضیحات</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>:(برحسب دقیقه)مدت زمان </label>
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
          <input type="submit" value="ویرایش برنامه ورزشی" className="btn btn-primary" />
          <h5 id="success"></h5>
        </div>
      </form>
    </div>
    )
  }
}  