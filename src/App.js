import React, { Component } from 'react'
import { Link,Route,BrowserRouter,Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from "./components/auth/PrivateRoute";
import AnonRoute from "./components/auth/AnonRoute";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { validateSession,userLogout } from "./services/userService";
import "bootstrap/dist/css/bootstrap.css";

  class App extends Component {

    state = {
      isAuthenticated: false,
      user: {},
    }

    setAuthStatus = (user) => {
      this.setState({
        isAuthenticated: true,
        user,
      });
    };
    
    
  /** */
    componentDidMount = () => {
      console.log(" componentDidMount->App.js->")
      
       const accessToken = localStorage.getItem("accessToken");
      
       if (accessToken) {
       console.log(" localstorage : ",accessToken);
      validateSession(accessToken)
        .then((response) => {
          if (response.session ) {
            //  console.log(response, "RESPONSE");
          this.setAuthStatus(response.session.userId);
          } else {
            this.setState({ isAuthenticated: false });
             // this added by Sunitha 
            // localStorage.removeItem("accessToken");
            console.log(" local accesstoken removed as session doenot exist at server ")
          }
         
        })
        .catch((err) => console.log(err));
    }
     };
    
    handleLogout = () => {
      console.log(" logout clicked .")
      const token = localStorage.getItem("accessToken");
      userLogout(token)
      .then(resp => {
        if (resp.success) {
            localStorage.clear();
            this.setState({
              isAuthenticated: false,
              user: {},
            });
        }
      }).catch(err=> console.log( err));
  
      };
    
    /** */
    render() {
    console.log(" app-> render: ", this.state)
  const {isAuthenticated} = this.state;
    return (
      <div className="App">
       
      <BrowserRouter >
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">    
            <a className="navbar-brand" href="/">
                <img src="./pokemon.png" width="30" height="30" alt="" />
              </a>            
          {isAuthenticated && <Link className="navbar-brand" to="/"> Home </Link>}
          {!isAuthenticated && <Link className="navbar-brand" to="/login"> Login </Link>}
          {!isAuthenticated && <Link className="navbar-brand" to="/signup"> Signup </Link>}
          {isAuthenticated && (
              <Link className="navbar-brand" to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
        
        </nav>

        <Switch>
            <PrivateRoute
              exact
              path="/" isAuthenticated={isAuthenticated} viewMyPokes={false}
              user={localStorage.getItem("accessToken") ? this.state.user :""}
            component={Home}
          />
          <AnonRoute
            exact isAuthenticated={isAuthenticated} 
            setAuthStatus = {this.setAuthStatus}                 
            path="/login" 
            component={Login}
          />
          <AnonRoute
            exact isAuthenticated={isAuthenticated} 
            setAuthStatus = {this.setAuthStatus}             
            path="/signup" 
            component={Signup}
          />
        </Switch>
      </BrowserRouter>
    </div>
    )
  }
}

export default App;