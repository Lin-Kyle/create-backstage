import {observable, action, runInAction, flow} from "mobx";
import {localCache} from 'JS/localCache';
import Axios from 'JS/Axios';
import api from '@/api';

class User {
    @observable userData = {}

    login = flow(function* (data) {
        try {
            const res = yield Axios({url: api.login, data});
            runInAction(() => {
                this.userData = res.data;
            })
            if (!res.error_code) {
                localCache.setItem('userData', res.data, 1);
                return true; // 登录成功
            }
            return false;
        } catch (e) {
            console.log(e);
        }
    })

    logout = flow(function* (params) {
        try {
            const res = yield Axios({url: api.logout, params});
            runInAction(() => {
                this.userData = {};
            })
            if (!res.error_code) {
                localCache.removeItem('userData');
            }
        } catch (e) {
            console.log(e);
        }
    })

}

export default new User()
