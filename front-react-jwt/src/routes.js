import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  Login  from './ui/LoginForm';
import { isAuthenticated } from './auth';


var Dashboard = ({ component: Component, ...rest}) =>(
    <Route {...rest} render={props =>(
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: {from: props.location} }} />
        )
    )}/>
)

const Routes = () =>{
   return <BrowserRouter>
        <Switch>
         <Dashboard exact path="/dashboard" component={() => <h1>Dashboard</h1> } />
         <Route exact path="/" component={Login}/>
        </Switch>
    </BrowserRouter>
}

export default Routes;