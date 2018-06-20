import React, {Component} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
//單頁面設置titlehttps://www.npmjs.com/package/react-document-title
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'
import logo from 'IMG/logo.svg'
import GlobalFooter from 'CMPT/GlobalFooter'
import {Login} from './LoadableComponent';
import 'CSS/login.less'

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
                            <Route path={'/login'} component={Login}/>
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
`

const H = styled.div `
    height: 44px;
    line-height: 44px;
    a {
      text-decoration: none;
      display: inline-block;
    }
`
