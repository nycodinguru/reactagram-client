import React, { Component } from 'react';
import './styles/index.scss';
import { Route, Switch, withRouter } from 'react-router-dom';
import { isMobileOnly } from "react-device-detect";

import Profile from './components/Profile/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './hoc/Layout';
import NoMatch from './components/NoMatch';
import ViewPostDirect from './components/Profile/ViewPostDirect/ViewPostDirect';
import Profiles from './components/Directory/Profiles';
import LoginMobile from './components/LoginMobile';


class App extends Component {
    render() {
        let routes = (
            <Route
                render={({ location }) => (
                    <React.Fragment>
                    <Switch location={location}>
                        <Route 
                            path="/" exact 
                            render={props => isMobileOnly ? <LoginMobile {...props}/> : <Signup {...props}/>}
                        />
                        <Route 
                            path="/accounts/login" exact 
                            render={props => <Login {...props}/>}
                        />
                        <Route 
                            path="/accounts/signup" exact 
                            render={props => <Signup {...props}/>}
                        />
                        <Route 
                            path="/directory/profiles" exact 
                            render={props => <Profiles {...props}/>}
                        />
                        <Route 
                            path="/:user" exact 
                            render={props => <Profile {...props}/>}
                        />
                        <Route 
                            path="/:user/:postId" exact 
                            render={props => <ViewPostDirect {...props}/>}
                        />
                        <Route 
                            path="*"
                            render={props => <NoMatch {...props}/>}
                        />         
                    </Switch>  
                    </React.Fragment>
                )}
            />
        )
       
        return (
            <div className="App">
                <Layout>{routes}</Layout>
            </div>
        )
    }
}

export default withRouter(App);
