import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props)=> {
  const { component: Component,isAuthenticated ,user, viewMyPokes} = props;

    return (
        <div>
            <Route render={() =>
          isAuthenticated ?
            <Component user={localStorage.getItem("accessToken") ?user :"" } isAuthenticated={isAuthenticated} viewMyPokes={viewMyPokes}/> : <Redirect to="/login" />
      }/>
        </div> 
    )
}
export default PrivateRoute;