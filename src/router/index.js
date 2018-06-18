import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import Login from 'PAGE/login/login';
import Main from 'PAGE/main/main';

export default class Router extends React.Component {
    render() {
        return <HashRouter>
            <switch>
                <Route exact="exact" path='/' component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/main" component={Main}/>
            </switch>
        </HashRouter>
    }
}
