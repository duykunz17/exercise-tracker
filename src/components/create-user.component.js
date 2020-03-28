import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
          username: ''
        }
      }
    
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    
    onSubmit(event) {
        event.preventDefault();
    
        const user = {
          username: this.state.username
        }
    
        console.log(user);

        axios.post('http://localhost:3001/users/add', user)
        .then(res => console.log(res.data));

        this.setState({
          username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={(event) => this.onSubmit(event)}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={(event) => this.isChange(event)}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        );
    }
}

export default CreateUser;