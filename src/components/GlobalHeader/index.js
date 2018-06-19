import React, {Component} from 'react'
import {Menu, Icon, Dropdown, Avatar, Tooltip} from 'antd';
import {observer, inject} from "mobx-react";
import {withRouter} from 'react-router-dom'
import './index.less'
import avatar from 'IMG/avatar.jpg'

@withRouter
@inject(store => ({global: store.global, user: store.user}))@observer
export default class GlobalHeader extends Component {
    componentDidMount() {
        let status = this.isInAdmin()
        this.props.global.changeAdminInStatus(status)
    }
    isInAdmin = () => {
        let hash = this.props.location.pathname.split('/')[1]
        return ['admin', 'daily'].includes(hash)
    }
    changeCurrentMenu = () => {
        const {changeAdminInStatus, changeCurrentMenu} = this.props.global
        let status = !this.isInAdmin()
        changeAdminInStatus(status)
        changeCurrentMenu(status)
    }
    changeCollapsed = () => {
        this.props.global.changeCollapsed()
    }

    // 退出登录
    logout = () => {
        const _props = this.props;
        _props.user.logout()
        _props.history.push('/login')
    }
    render() {
        const {global, user} = this.props,
            title = global.inAdmin
                ? '返回查看数据'
                : '系统管理',
            menu = (<Menu>
                <Menu.Item key="logout" onClick={this.logout}>
                    <Icon type="logout"/>
                    退出登录
                </Menu.Item>
            </Menu>);

        return (<div className={'header'}>
            <Icon className="trigger" type={global.collapsed
                    ? 'menu-unfold'
                    : 'menu-fold'} onClick={this.changeCollapsed}/>
            <div className={'right'}>
                <Tooltip title={title}>
                    <span onClick={this.changeCurrentMenu} className='action'>
                        {title}
                    </span>
                </Tooltip>
                <Dropdown overlay={menu}>
                    <span className='action account'>
                        <Avatar size="small" className='avatar' src={avatar}/>
                        <span className={'name'}>{user.userData.username || 'admin'}</span>
                    </span>
                </Dropdown>
            </div>
        </div>)
    }
}
