import React, {Component, Fragment} from 'react';
import {Switch, HashRouter, Route, Redirect} from 'react-router-dom'
import LoginLayout from 'LAYOUT/loginLayout';
import BasicLayout from 'LAYOUT/basicLayout';
import Authority from './authority'
import {observer, inject} from 'mobx-react'

@inject(store => ({global: store.global}))@observer
export default class Router extends Component {
    render() {
        return <HashRouter>
            <App firstPath={this.props.global.firstPath}/>
        </HashRouter>
    }
}


class App extends Component {
    render() {
        return (<Fragment>
            <Authority/>
            <Switch>
                <Redirect exact={true} from='/' to={this.props.firstPath}/>
                <Route path="/login" component={LoginLayout}/>
                <Route path="/" component={BasicLayout}/>
            </Switch>
        </Fragment>)
    }
}
