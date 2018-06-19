import {observable, action, computed} from 'mobx'
import createHistory from 'history/createHashHistory'

import {formatter} from 'JS/utils'

const history = createHistory({
        // forceRefresh: true
    }),
    loginUrl = '/login',
    adminMenu = [
        {
            name: '用户分析',
            path: 'admin',
            icon: 'check-circle-o',
            children: [
                {
                    name: '用户管理',
                    path: 'management'
                }, {
                    name: '用户组管理',
                    path: 'group-management'
                }
            ]
        }, {
            name: '日报管理',
            path: 'daily',
            icon: 'calendar',
            children: [
                {
                    name: '日报列表',
                    path: 'list'
                }
            ]
        }
    ],
    defaultMenu = [
        {
            name: '概况总览',
            icon: 'dashboard',
            path: 'dashboard/analysis'
        }, {
            name: '用户分析',
            icon: 'smile',
            path: 'analysis',
            children: [
                {
                    name: '新增用户',
                    path: 'news_date',
                    api: {
                        getData: '/users-statis/search',
                        searchField: '/users-statis/search-field'
                    }
                }, {
                    name: '访问用户',
                    path: 'access_date',
                    api: {
                        getData: '/users-statis/search',
                        searchField: '/users-statis/search-field'
                    }
                }, {
                    name: '访问用户（小时）',
                    path: 'access_hour',
                    api: {
                        getData: '/users-statis/search',
                        searchField: '/users-statis/search-field'
                    }
                }, {
                    name: '新增访问用户（小时）',
                    path: 'new_hour',
                    api: {
                        getData: '/users-statis/search',
                        searchField: '/users-statis/search-field'
                    }
                }
            ]
        }
    ];

class Global {
    @observable collapsed = false;
    @observable menuData = {
        currentMenu: [], // 当前菜单数据
        adminMenu: formatter(adminMenu), // 管理员菜单
        defaultMenu: []
    };
    @observable inAdmin = false;
    @observable currentMenuApi = '';

    // 修改当前菜单列表
    @action changeCurrentMenu = (inAdmin = this.inAdmin) => {
        //確認菜單
        this.menuData.currentMenu = this.menuData[
            inAdmin
                ? 'adminMenu'
                : 'defaultMenu'
        ]

        history.push(this.firstPath)
    }

    @action changeAdminInStatus = (status) => { // 修改是否在admin页面状态
        this.inAdmin = status
    }

    // 切换菜单大小
    @action changeCollapsed = (status) => {
        this.collapsed = typeof status !== 'undefined'
            ? status
            : !this.collapsed
    }

    @computed get firstPath() {
        const {currentMenu} = this.menuData;
        if (currentMenu.length) {
            const _data = currentMenu[0];
            return typeof _data.children !== 'undefined' ? _data.children[0].path : _data.path
        }
        return loginUrl;
    }

    // 获取菜单栏
    @action getDefaultMenu = (inAdmin = this.inAdmin) => {
        this.menuData.defaultMenu = formatter(defaultMenu);
        this.menuData.currentMenu = this.menuData[
            inAdmin
                ? 'adminMenu'
                : 'defaultMenu'
        ]
    }

    // 当前菜单api数据
    @action changeCurrentMenuApi = (api) => {
        if (api) {
            this.currentMenuApi = api
        }
    }
}

export default new Global()
