import React, { Component } from 'react'
import { userSignUp } from "../services/userService";

export default class Signup extends Component {
    state = {
        username:"",
        email:"",
        password: "",
        errorMessage:"",
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(" sign up clicked ... ");
        userSignUp(this.state)
       .then((signupRes) => {
           console.log(" signup result: ", signupRes);
            
           if (signupRes.accessToken) {
               console.log(" access token recicev from signup request")
               localStorage.setItem("accessToken", signupRes.accessToken);
               this.props.setAuthStatus(signupRes.user);
               this.props.history.push("/")
               console.log(" history: ", this.props.history);
           } else {
               this.setState({
                errorMessage: signupRes.errorMessage,
            })
           }             
      })
      .catch((err) => console.log(err));
    }
    
    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [ name]:  value,
            })
    }
    
    render = () => {
        console.log( " signup props: : ", this.props)
     const { username, email, password} = this.state;
        return (
            <div className="form-group">
                <h2> Signup </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                    <input className="form-control"
                        name="username"
                        value={username}
                        type="text"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    
                    <div className="form-group">
                        <label>Email : </label>
                    <input className="form-control"
                        name="email"
                        value={email}
                        type="email"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                    <input className="form-control"
                        name="password"
                        value={password}
                        type="password"
                        required={true}
                        onChange={this.handleChange}
                    />
                    </div>
                    
          <button  className="btn btn-primary  w-25 justify-content-center"> Signup </button>
                </form>
                <div> { this.state.errorMessage.length > 0 &&  this.state.errorMessage} </div>
            </div>
        )
    }
}
