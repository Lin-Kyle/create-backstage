import React from 'react';
import ReactDOM from 'react-dom';
/* antdUI库 */
import {LocaleProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Provider} from "mobx-react"
import store from "MOBX"
import Router from "./router"
import 'CSS/index.css';

import registerServiceWorker from '@/registerServiceWorker';

moment.locale('zh-cn');
ReactDOM.render(<Provider {...store}>
    <LocaleProvider locale={zhCN}>
        <Router />
    </LocaleProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
