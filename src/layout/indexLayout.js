import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'

import {Switch, Route, Link} from 'react-router-dom'
import logo from 'IMG/logo.svg'
import GlobalFooter from 'CMPT/GlobalFooter'
import Loadable from 'react-loadable';
import Loading from 'CMPT/Loading';
import 'CSS/login.less'

const LoadableLogin = Loadable({
    loader: () => import('PAGE/login/login'),
    loading: Loading,
    delay: 30000,
})

export default class indexLayout extends Component {
    render() {
        return (<DocumentTitle title='登陆'>
            <div className='user-layout'>
                <div className={'container'}>
                    <div className={'content'}>
                        <div className={'top'}>
                            <H>
                                <Link to="/">
                                    <Logo alt="logo" src={logo}/>
                                    <span className={'title'}>Ant Design</span>
                                </Link>
                            </H>
                            <div className={'desc'}>高朋网智能 Bi 系统</div>
                        </div>
                        <Switch>
                            <Route path={'/login'} component={LoadableLogin}/>
                        </Switch>
                    </div>
                    <GlobalFooter/>
                </div>
            </div>
        </DocumentTitle>);
    }
}

const Logo = styled.img `
    height: 44px;
    vertical-align: top;
    //margin-right: 16px;
`

const H = styled.div `
    height: 44px;
    line-height: 44px;
    a {
      text-decoration: none;
      display: inline-block;
    }
`
