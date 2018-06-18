import React, {Component} from 'react';
// import SilderMenu               from '../components/SiderMenu'
import GlobalHeader             from 'COMPONENT/GlobalHeader'
import GlobalFooter             from 'COMPONENT/GlobalFooter'
// import Routers from '../common/router'
import _ from 'lodash'
import {observer, inject} from "mobx-react";
import {Layout} from 'antd';

const {Header, Content} = Layout;

@inject(allStore => ({global: allStore.global}))
@observer
export default class BasicLayout extends Component {
    state = {}

    componentDidMount() {
        /*this.resize()
        // BUG 触发了两次
        window.addEventListener('resize', _.debounce(this.resize, 200));
        if (!this.props.global.menuData.currentMenu.length) {
            // 获取默认的菜单 正常情况下 current 应该是 defaultMenu 不考虑会直接到系统管理的情况
            this.props.global.getDefaultMenu()
        }*/
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    // 节流
    throttle = (fn, time) => {}
    resize = () => {
        console.log('窗口resize');
        const {collapsed, changeCollapsed} = this.props.global
        if (window.innerWidth <= 1200) {
            if (!collapsed)
                changeCollapsed(true)
        } else {
            if (collapsed)
                changeCollapsed(false)
        }
    }

    render() {
        return (<Layout>
            {/* <SilderMenu></SilderMenu> */}
            <Layout>
                <Header style={{
                        padding: 0
                    }}><GlobalHeader/></Header>
                <Content style={{
                        margin: '24px 24px 0',
                        height: '100%'
                    }}>
                    {/* <Routers></Routers> */}
                </Content>
                <GlobalFooter></GlobalFooter>
            </Layout>
        </Layout>);
    }
}
