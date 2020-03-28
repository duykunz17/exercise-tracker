import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <Link to="" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Link>
      </td>
    </tr>
)

class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/exercises/')
            .then(res => {
                this.setState({
                    exercises: res.data
                });
            })
            .catch((err) => { console.log(err) })
    }
    
    deleteExercise = (id) => {
        axios.delete('http://localhost:3001/exercises/'+id)
            .then(res => console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    listExercise() {
        return this.state.exercises.map(currentExercise => {
          return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Exercises Logged</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {this.listExercise()}
                </tbody>
                </table>
            </div>
        );
    }
}

export default ExerciseList;