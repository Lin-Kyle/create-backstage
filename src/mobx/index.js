import {configure} from 'mobx'
import global from './global'
import user from './user'

// 严格模式
configure({enforceActions: true})

export default {
    global,
    user
}
