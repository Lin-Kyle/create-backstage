import React from 'react';
import ReactDOM from 'react-dom';
/* antdUI库 */
import {LocaleProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'CSS/index.css';

import Login from 'PAGE/login/Login';
import registerServiceWorker from '@/registerServiceWorker';

moment.locale('zh-cn');

ReactDOM.render(<LocaleProvider locale={zhCN}><Login/></LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
