// 认证用户是否登录
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {localCache} from 'JS/localCache';

let loginUrl = '/login'

@withRouter
export default class AuthRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLogin: localCache.getItem('userData', 1)
        }
    }

    componentDidMount() {
        if (this.props.location.pathname !== loginUrl) {
            this.getUser()
        }
    }

    componentWillReceiveProps(nextProps, stateProps) {
        if (nextProps.location.pathname !== loginUrl) {
            this.getUser()
        }
    }

    getUser = () => {
        if (!this.state.hasLogin) {
            this.props.history.push(loginUrl)
        }
    }
    render() {
        return null
    }
}
