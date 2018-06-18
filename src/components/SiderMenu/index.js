import React, {Component}       from 'react'
import {Layout, Menu, Icon}     from 'antd';
import {Link, withRouter}       from 'react-router-dom'
import logo                     from '../../assets/logo.svg';
import { observer, inject }     from 'mobx-react'

import './index.less'
const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={` sider-menu-item-img`}   style={{width: '14px', marginRight: '10px'}}/>;
    }
    if (typeof icon === 'string') {
      return <Icon type={icon} />;
    }
    return icon;
};

@withRouter
@inject( allStore => ({
    global: allStore.global
})) @observer
export default class SiderMenu extends Component {
    componentWillReceiveProps() {
        let currentMenu = this.props.global.menuData.currentMenu
        let { pathname } = this.props.location
        currentMenu.forEach( item => {
            // 目前只考虑只有二级菜单的情况
            if ( item.children ) {
                item.children.forEach( item1 => {
                    if (item1.path === pathname ) {
                        this.props.global.changeCurrentMenuApi(item1.api)
                    }
                })
            } else {
                if ( item.path === pathname ) {
                    this.props.global.changeCurrentMenuApi(item.api)
                }
            }
        })
    }

    getNavMenuItems = menusData => {
        if (!menusData) {
          return [];
        }
        // 1 过滤掉没设置名字 并且不是设置了 hideInMenu 的

        return menusData
          .filter(item => item.name && !item.hideInMenu)
          .map(item => {
            // make dom 递归调用  判断是否还有子元素
            const ItemDom = this.getSubMenuOrItem(item);
            return this.checkPermissionItem(item.authority, ItemDom);
          })
          .filter(item => item);
    };
    getSubMenuOrItem = item => {
        // 拥有子元素 并且每个子元素都有name属性
        if (item.children && item.children.some(child => child.name)) {
          const childrenItems = this.getNavMenuItems(item.children);


          if (childrenItems && childrenItems.length > 0) {
            return (
              <SubMenu
                data-api={JSON.stringify(item.api)}
                title={
                  item.icon ? (
                    <span>
                      {getIcon(item.icon)}
                      <span>{item.name}</span>
                    </span>
                  ) : (
                    item.name
                  )
                }
                key={item.path}
              >
                {childrenItems}
              </SubMenu>
            );
          }
          return null;
        } else {
          // 当无子元素直接返回 getMenuItemPath 判断返回 a  还是href
          return <Menu.Item data-api={JSON.stringify(item.api)} key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };
    // permission to check
    checkPermissionItem = (authority, ItemDom) => {
        if (this.props.Authorized && this.props.Authorized.check) {
        const { check } = this.props.Authorized;
        return check(authority, ItemDom);
        }
        return ItemDom;
    };
    /**
     * 判断是否是http链接.返回 Link 或 a
     * @memberof SiderMenu
     */
    getMenuItemPath = item => {
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
        return (
            <a href={itemPath} target={target}>
            {icon}
            <span>{name}</span>
            </a>
        );
        }
        return (
        <Link
            to={itemPath}
            target={target}
            // replace={itemPath === this.props.location.pathname}
            onClick={
                this.props.isMobile ?
                () => {
                    this.props.onCollapse(true);
                }
                : undefined
            }
        >
            {icon}
            <span>{name}</span>
        </Link>
        );
    };
    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
        return path;
        } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
        }
    };
    // 选中
    getSelectedKeys() {
        return this.props.location.pathname
    }
    // 打开的菜单
    getDefaultOpenKey() {
        return '/' + this.getSelectedKeys().split('/')[1]
    }
    changeCurrentMenuData = (item) => {
        const api = item.item.props['data-api']
        if (api) {
            this.props.global.changeCurrentMenuApi(JSON.parse(api))
        }
    }

    render() {
        const { global } = this.props
        return (
            <Sider
                trigger={null}
                collapsible
                breakpoint="lg"
                width={200}
                className={'sider'}
                collapsed={ global.collapsed }
            >
                <div key="logo" className='logo'>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                        <h1>Bi 管理系统</h1>
                    </Link>
                </div>

                <Menu
                        onClick={this.changeCurrentMenuData}
                        key='menu'
                        theme="dark"
                        mode="inline" selectedKeys={[this.getSelectedKeys()]}
                        defaultOpenKeys={[this.getDefaultOpenKey()]}>
                    {
                        this.getNavMenuItems(this.props.global.menuData.currentMenu)
                    }
                </Menu>
            </Sider>

        )
    }
}

