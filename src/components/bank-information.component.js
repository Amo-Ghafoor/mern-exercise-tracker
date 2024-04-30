import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { serverAddress} from '..';
const Exercise = props => (
    <tr>
      <td>{props.exercise.name}</td>
      <td>{props.exercise.difficulty}</td>
      <td>
      {props.exercise.muscles.map(muscle => (
        <ol key={muscle}>{muscle}</ol>
      ))}
      </td>
      <td>{props.exercise.type}</td>
      <td>{props.exercise.place}</td>

      <td></td>
      <td>
      </td>
    </tr>
  )
  export default class Details extends Component {
    constructor(props) {
      super(props);
  
    //   this.deleteExercise = this.deleteExercise.bind(this)
  
      this.state = {exercises: []};
    }
  
    componentDidMount() {
      axios.get(`http://${serverAddress}:5000/bank`)
        .then(response => {
          this.setState({ exercises: response.data })
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
            <br/>
            
            <br/>

            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>name</th>
                <th>difficulty</th>
                <th>muscles</th>
                <th>type</th>
                <th>place</th>
                <th><a href="/" target="_blank">back</a></th>

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