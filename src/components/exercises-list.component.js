import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverAddress } from '..';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>ویرایش</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>حذف</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get(`http://${serverAddress}:5000/exercises/`)
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete(`http://${serverAddress}:5000/exercises/`+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>برنامه های ورزشی</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>نام کاربری</th>
              <th>توضیحات</th>
              <th>مدت زمان</th>
              <th>تاریخ</th>
              <th>دستورات</th>
              <th>نام برنامه ورزشی</th>

            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}