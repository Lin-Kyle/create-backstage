import {observable, action, runInAction, flow} from "mobx";
import {sStorage} from 'JS/localCache';
import Axios from 'JS/Axios';
import api from '@/api';

class User {
    @observable login_info = {}

    login = flow(function* (data) {
        try {
            const res = yield Axios({
                url: api.login,
                method: 'post',
                params: {
                    username: data.userName,
                    password: data.password,
                    remember: data.remember
                }
            });
            runInAction(() => {
                sStorage.setItem('userData', res.data);
                this.login_info = res.data;
            })
        } catch (e) {}
    })

}

export default new User()
