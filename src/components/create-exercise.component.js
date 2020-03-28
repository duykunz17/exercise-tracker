import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/users/')
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
    }
    

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    isChangeDate(date) {
        this.setState({
          date: date
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post('http://localhost:3001/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={(event) => this.isChange(event)}>
                        {
                            this.state.users.map(function(user) {
                            return <option 
                                        key={user}
                                        value={user}>{user}
                                   </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        name="description"
                        value={this.state.description}
                        onChange={(event) => this.isChange(event)}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="duration"
                        value={this.state.duration}
                        onChange={(event) => this.isChange(event)}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        name="date"
                        selected={this.state.date}
                        onChange={(date) => this.isChangeDate(date)}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateExercise;